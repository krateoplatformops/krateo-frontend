import { useEffect, useState } from "react";
import DrawerPanel from "../components/DrawerPanel/DrawerPanel";
import { useNavigate } from "react-router-dom";
import { setDynamicContent, setDynamicContentState } from "../features/dynamicContent/dynamicContentSlice";
import { useAppDispatch } from "../redux/hooks";
import { useDeleteContentMutation, useLazyGetContentQuery, usePostContentMutation, usePutContentMutation } from "../features/common/commonApiSlice";

const useEvents = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { panel, route, prefix, endpoint, content, verb } = props;
	const dispatch = useAppDispatch();
	const [getContent, {data, isLoading, isSuccess, isError}] = useLazyGetContentQuery();
	const [postContent] = usePostContentMutation();
	const [putContent] = usePutContentMutation();
  const [deleteContent] = useDeleteContentMutation();

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
        await getContent({endpoint}).unwrap()
        if (data && isSuccess)
        dispatch(setDynamicContent({prefix: prefix, status: "success", content: data}))
      } else {
        // get content
        dispatch(setDynamicContent({prefix: prefix, status: "success", content: content}))
      }
    } else if (endpoint && verb) {
      if (verb === "get") {
        await getContent({endpoint}).unwrap();
      } else if (verb === "post") {
        await postContent({endpoint}).unwrap();
      } else if (verb === "put") {
        await putContent({endpoint}).unwrap();
      } else if (verb === "delete") {
        await deleteContent({endpoint}).unwrap();
      }
    }
  }

  if (panel) {
    elementEvent = <DrawerPanel panel={panel} isOpen={isOpen} onClose={() => setIsOpen(false)} />
  }

  return { manageEvent: manageEvent, elementEvent: elementEvent }
}

export default useEvents;