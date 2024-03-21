import { DeleteOutlined } from "@ant-design/icons";
import { Card, Avatar, Button, Space, Typography, Tag } from "antd";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getColorCode } from "../../../utils/colors";
import useEvents from "../../../hooks/useEvents";
// import { useNavigate } from "react-router-dom";


const CardTemplate = (props) => {
  const {id, icon, color, title, status, date, content, tags, actions, allowedActions} = props;

  const [manageEvent, elementEvent] = useEvents(props)
  
  // const navigate = useNavigate();
  // const onChangePage = () => {
  //   navigate(id.toString())
  // }

  const isAllowed = (verb) => {
    if (Array.isArray(actions) && Array.isArray(allowedActions)) {
      const name = actions.find(el => el.verb.toUpperCase() === verb.toUpperCase())?.name;
      return allowedActions.indexOf(name) > -1
    } else {
      return false;
    }
  }

  return (
    <>
      {elementEvent}
      <Card
        key={id}
        onClick={manageEvent}
        className={styles.card}
        title={
          <Space size="large" className={styles.header}>
            <Avatar style={{ backgroundColor: getColorCode(color) }} size={64} icon={<FontAwesomeIcon icon={icon} />} />
            <div className={styles.details}>
              <Typography.Title className={styles.title} ellipsis level={2} title={title}>{title}</Typography.Title>
              <Space className={styles.subTitle}>
                <div className={styles.status} style={{ color: color }}>{status}</div>
                <div className={styles.date}>{date}</div>
              </Space>
            </div>
          </Space>
        }
        actions={[
          <Space wrap key='1'>{tags?.split(",")?.map((tag, i) => <Tag key={`Tag_${i}`}>{tag}</Tag>)}</Space>,
          <Button key='2' onClick={(e) => {e.stopPropagation(); console.log("CLICK DELETE")}} icon={<DeleteOutlined />} type="text" disabled={!isAllowed("DELETE")} />
        ]}
      >
        {content}
      </Card>
    </>
  )
}

export default CardTemplate;