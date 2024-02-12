import { Avatar, Space, Typography } from "antd";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getColorCode } from "../../../utils/colors";


const RichElement = ({icon, color, title}) => {


  return (
    <Space size="large" className={styles.richElement}>
      <Avatar style={{ backgroundColor: getColorCode(color) }} size={64} icon={<FontAwesomeIcon icon={icon} />} />
      <div className={styles.details}>
        <Typography.Title className={styles.title} ellipsis level={2} title={title}>{title}</Typography.Title>
      </div>
    </Space>
  )
}

export default RichElement;