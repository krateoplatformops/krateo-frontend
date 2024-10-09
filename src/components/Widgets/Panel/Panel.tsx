import { Card, Tooltip, Typography } from "antd";
import useParseData from "../../../hooks/useParseData";
import styles from "./styles.module.scss";
import { QuestionCircleOutlined } from "@ant-design/icons";

type PanelType = {
  title?: string,
  tooltip?: string,
  buttons?: React.ReactElement[],
  content: React.ReactElement
}

const Panel = ({title, tooltip, buttons, content}: PanelType) => {
  const [parseContent] = useParseData()

  // let panelContent;

  // if (Array.isArray(content)) {
  //   panelContent = content.map(el => {
  //     return parseContent(el, 1);
  //   })
  // } else {
  //   panelContent = parseContent(content, 1);
  // }

  return (
    <Card
      className={styles.card}
      title={(title && title !== "") ?
        <Typography.Title className={styles.title} ellipsis level={2} title={title}>{title}</Typography.Title>
        : undefined
      }
      extra={
        tooltip && <Tooltip className={styles.tooltip} title={tooltip}><QuestionCircleOutlined /></Tooltip>
      }
      actions={buttons ? [parseContent(buttons, "")] : []}
    >
      {/* {panelContent} */}
      {content}
    </Card>
  )
}

export default Panel;