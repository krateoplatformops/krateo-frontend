import { Card, Space, Typography } from "antd";
import styles from "./styles.module.scss";
import widgets from "..";

const Panel = ({title, content}) => {
  const Component = widgets[content.kind];

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
      <Component {...content.spec.app.props} />
    </Card>
  )
}

export default Panel;