import { Avatar, Flex, Space, Typography } from "antd";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getColorCode } from "../../../utils/colors";


const RichRow = ({color, icon, subPrimaryText, primaryText, subSecondaryText, secondaryText}) => {


  return (
    <Flex justify="space-between" className={styles.richRow} gap={10}>
      <Space align="start" size="large" className={styles.primary}>
        <Avatar style={{ backgroundColor: getColorCode(color) }} size={icon ? 24 : 18} icon={<FontAwesomeIcon icon={icon} />} />
        <div>
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