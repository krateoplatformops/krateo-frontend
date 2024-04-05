import { Card, Space, Typography } from "antd";
import useParseData from "../../../hooks/useParseData";
import styles from "./styles.module.scss";

const Panel = ({title, content}) => {
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
        <Space size="large" className={styles.header}>
          <div className={styles.details}>
            <Typography.Title className={styles.title} ellipsis level={2} title={title}>{title}</Typography.Title>
          </div>
        </Space>
        : undefined
      }
    >
      {panelContent}
    </Card>
  )
}

export default Panel;