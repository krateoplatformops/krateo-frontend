import { useSelector } from "react-redux";
import { selectDynamicContent } from "../../../features/dynamicContent/dynamicContentSlice";
import Skeleton from "../../Skeleton/Skeleton";
import { Result } from "antd";
import useParseData from "../../../hooks/useParseData";

type DynamicContentType = {
  prefix: string,
  content?: object[],
}

const DynamicContent = ({prefix, content}: DynamicContentType) => {
  const storeContents = useSelector(selectDynamicContent);
  let storeContent = storeContents.find(el => el.prefix === prefix);

  // initial data if present
  if (!storeContent && content !== undefined) {
    storeContent = {
      prefix: prefix,
      status: "success",
      content: content
    }
  }
  const [parseContent] = useParseData();


  return (
    storeContent?.status === "loading" ?
      <Skeleton />
    :
    storeContent?.status === "error" ?
      <Result status="error" title="Ops! Something didn't work" subTitle="Unable to retrieve content data" />
    :
    storeContent?.status === "success" ?
    parseContent(storeContent.content, 1)
    :
    <></>
  )
}

export default DynamicContent;