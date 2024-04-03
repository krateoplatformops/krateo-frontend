import { useSelector } from "react-redux";
import { selectDynamicContent } from "../../../features/dynamicContent/dynamicContentSlice";
import Skeleton from "../../Skeleton/Skeleton";
import { Result } from "antd";
import useParseData from "../../../hooks/useParseData";

const DynamicContent = ({prefix}) => {
  const contents = useSelector(selectDynamicContent);
  const content = contents.find(el => el.prefix === prefix);
  const [getContent] = useParseData()


  return (
    content?.status === "loading" ?
      <Skeleton />
    :
    content?.status === "error" ?
      <Result status="error" title="Ops! Something didn't work" subTitle="Unable to retrieve content data" />
    :
    content?.status === "success" ?
      getContent(content.content, 1)
    :
    <></>
  )
}

export default DynamicContent;