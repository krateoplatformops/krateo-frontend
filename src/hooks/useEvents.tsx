import { useEffect, useState } from "react";
import DrawerPanel from "../components/DrawerPanel/DrawerPanel";
import { useNavigate } from "react-router-dom";
import { setDynamicContent, setDynamicContentState } from "../features/dynamicContent/dynamicContentSlice";
import { useAppDispatch } from "../redux/hooks";
import { useLazyGetContentQuery } from "../features/common/commonApiSlice";

const useEvents = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { panel, route, prefix, endpoint, content } = props;
	const dispatch = useAppDispatch();
	const [getContent, {data, isLoading, isSuccess, isError}] = useLazyGetContentQuery();
  const ls = localStorage.getItem("user");
	const username = ls && JSON.parse(ls)?.user.username;
	const group = ls && JSON.parse(ls)?.groups[0]

  const navigate = useNavigate();
  let elementEvent = <></>;

  useEffect(() => {
    if (isLoading) {
      dispatch(setDynamicContentState({prefix: prefix, status: "loading"}));
    }
    if (isError) {
      dispatch(setDynamicContentState({prefix: prefix, status: "error"}));
    }
  }, [dispatch, isError, isLoading, prefix]);

  const manageEvent = async () => {
    if (panel) {
      // case 1: open drawer
      setIsOpen(true);
    } else if (route) {
      // case 2: change route
      navigate(route)
    } else if (prefix) {
      // case 3: change component content
      if (endpoint) {
        // load content to show in dynamicData
        await getContent({endpoint, username, group}).unwrap()
        if (data && isSuccess)
        dispatch(setDynamicContent({prefix: prefix, status: "success", content: data}))
      } else {
        // get content
        dispatch(setDynamicContent({prefix: prefix, status: "success", content: content}))
      }
    }
  }

  if (panel) {
    elementEvent = <DrawerPanel panel={panel} isOpen={isOpen} onClose={() => setIsOpen(false)} />
  }

  return [manageEvent, elementEvent]
}

export default useEvents;