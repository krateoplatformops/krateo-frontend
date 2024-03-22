import { Card, Space, Typography } from "antd";
import styles from "./styles.module.scss";
import widgets from "..";

const Panel = ({title, content}) => {
  let panelContent;

  if (Array.isArray(content)) {
    panelContent = content.map(el => {
      const Component = widgets[el.kind];
      return <Component {...el.spec.app.props} />
    })
  } else {
    const Component = widgets[content.kind];
    panelContent = <Component {...content.spec.app.props} />
  }

  return (
    <Card
      className={styles.card}
      title={
        <Space size="large" className={styles.header}>
          <div className={styles.details}>
            <Typography.Title className={styles.title} ellipsis level={2} title={title}>{title}</Typography.Title>
          </div>
        </Space>
      }
    >
      {panelContent}
    </Card>
  )
}

export default Panel;