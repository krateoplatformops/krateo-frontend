import { Avatar, Flex, Space, Typography } from "antd";
import styles from "./styles.module.scss";
import { getColorCode } from "../../../utils/colors";


const RichRow = ({color, subPrimaryText, primaryText, subSecondaryText, secondaryText}) => {


  return (
    <Flex justify="space-between" className={styles.richRow}>
      <Space size="large">
        <Avatar style={{ backgroundColor: getColorCode(color) }} size={20} />
        <div className={styles.primary}>
          <Typography.Text className={styles.subtext}>{subPrimaryText}</Typography.Text>
          <Typography.Paragraph>{primaryText}</Typography.Paragraph>
        </div>
      </Space>
      <div className={styles.secondary}>
        <Typography.Text className={styles.subtext}>{subSecondaryText}</Typography.Text>
        <Typography.Paragraph>{secondaryText}</Typography.Paragraph>
      </div>
    </Flex>
  )
}

export default RichRow;