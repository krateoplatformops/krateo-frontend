import { Card, Tooltip, Typography } from "antd";
import useParseData from "../../../hooks/useParseData";
import styles from "./styles.module.scss";
import { QuestionCircleOutlined } from "@ant-design/icons";

const Panel = ({title, tooltip, buttons, content}) => {
  const [getContent] = useParseData()

  let panelContent;

  if (Array.isArray(content)) {
    panelContent = content.map(el => {
      return getContent(el, 1);
    })
  } else {
    panelContent = getContent(content, 1);
  }

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
      actions={buttons ? [getContent(buttons, "")] : []}
    >
      {panelContent}
    </Card>
  )
}

export default Panel;