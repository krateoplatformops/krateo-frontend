import { Typography } from "antd";
import styles from "./styles.module.scss";
const Paragraph = ({text}) => {
  return (
    <Typography.Paragraph className={styles.paragraph}>{text}</Typography.Paragraph>
  )
}

export default Paragraph;