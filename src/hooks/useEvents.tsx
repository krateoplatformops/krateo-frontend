import { useEffect, useState } from "react";
import DrawerPanel, { DrawerPanelContent } from "../components/DrawerPanel/DrawerPanel";
import { useNavigate } from "react-router-dom";
import { setDynamicContent, setDynamicContentState } from "../features/dynamicContent/dynamicContentSlice";
import { useAppDispatch } from "../redux/hooks";
import { useDeleteContentMutation, useLazyGetContentQuery, usePostContentMutation, usePutContentMutation } from "../features/common/commonApiSlice";

export type EventType = {
  route?: string,
  drawer?: "true" | "false" | DrawerPanelContent,
  drawerTitle?: string, // TEMP: remove when DrawerPanelContent is implemented
  drawerSize?: "default" | "large", // TEMP: remove when DrawerPanelContent is implemented
  form?: "true" | "false",
  showFormStructure?: "true" | "false",
  prefix?: string,
  endpoint?: string,
  content?: object,
  actions?: {
    verb: "get" | "put" | "post" | "delete",
    path: string
  }[]
}

const useEvents = ({ drawer, drawerTitle, drawerSize, route, form, showFormStructure, prefix, endpoint, content, actions }: EventType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
	const dispatch = useAppDispatch();
  const [drawerContent, setDrawerContent] = useState<DrawerPanelContent>();
	const [getContent, {data, isLoading, isSuccess, isError}] = useLazyGetContentQuery();
	const [postContent] = usePostContentMutation();
	const [putContent] = usePutContentMutation();
  const [deleteContent] = useDeleteContentMutation();

  const navigate = useNavigate();
  let elementEvent = <></>;

  useEffect(() => {
    if (prefix) {
      if (isLoading) {
        dispatch(setDynamicContentState({prefix: prefix, status: "loading"}));
      }
      if (isError) {
        dispatch(setDynamicContentState({prefix: prefix, status: "error"}));
      }
    }
  }, [dispatch, isError, isLoading, prefix]);

  const manageEvent = async () => {
    /**
     * route: navigate to a new route
     * drawer:
     *  - open a DrawerPanel, call the GET action to get panel content to parse
     *  - if filter: using the prefix to save filters, get the filters values from the store
     * endpoint delete: call the api to delete the content
     */

    if (route) {
      // case 1: change route
      navigate(route)
    } else if (drawer) {
      // case 2: open drawer
      setIsOpen(true);
      try {
        // get content to show in drawer
        if (form === "true") {
          // show form in drawer
          const drawerContent: DrawerPanelContent = {
            type: form === "true" ? "form" : undefined,
            title: drawerTitle || "", // TEMP: get title from drawer.title
            size: drawerSize, // TEMP: get size from drawer.size
            buttons: [ // TEMP: get size from drawer.buttons
              {label: "reset", type: "default", action: "reset"},
              {label: "submit", type: "primary", action: "submit"}
            ],
            content: {
              element: "formGenerator",
              props: {
                prefix: prefix,
                showFormStructure: showFormStructure,
                fieldsEndpoint: actions?.find(el => el.verb?.toLowerCase() === "get")?.path
              }
            }
          }
          setDrawerContent(drawerContent);
        }

        // let endpointURL = endpoint ? endpoint : actions?.find(action => action.verb.toLowerCase() === "get")?.path;
        // if (endpointURL) { 
        //   await getContent({endpoint: endpointURL});
        // }
      } catch (error) {

      }
    }

    // if (panel) {
    //   // case 1: open drawer
    //   setIsOpen(true);
    // } else if (route) {
    //   // case 2: change route
    //   navigate(route)
    // } else if (prefix) {
    //   // case 3: change component content
    //   if (endpoint) {
    //     // load content to show in dynamicData
    //     await getContent({endpoint}).unwrap()
    //     if (data && isSuccess)
    //     dispatch(setDynamicContent({prefix: prefix, status: "success", content: data}))
    //   } else {
    //     // get content
    //     dispatch(setDynamicContent({prefix: prefix, status: "success", content: content}))
    //   }
    // } else if (endpoint && verb) {
    //   if (verb === "get") {
    //     await getContent({endpoint}).unwrap();
    //   } else if (verb === "post") {
    //     await postContent({endpoint}).unwrap();
    //   } else if (verb === "put") {
    //     await putContent({endpoint}).unwrap();
    //   } else if (verb === "delete") {
    //     await deleteContent({endpoint}).unwrap();
    //   }
    // }
  }

  if (drawer) {
    elementEvent = (
      <DrawerPanel
        drawer={drawerContent || { title: "", content: { element: "none" } }}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    )
  }

  useEffect(() => {
    if (data && isSuccess) {
      console.log("DATA BUTTON", data)
    }
  }, [data, dispatch, isSuccess])

  return { manageEvent: manageEvent, elementEvent: elementEvent }
}

export default useEvents;