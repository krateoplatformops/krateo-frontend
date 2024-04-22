import { DeleteOutlined } from "@ant-design/icons";
import { Card, Avatar, Button, Space, Typography, Tag } from "antd";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getColorCode } from "../../../utils/colors";
import useEvents from "../../../hooks/useEvents";
import { useDeleteContentMutation } from "../../../features/common/commonApiSlice";
import { useEffect } from "react";
import useCatchError from "../../../utils/useCatchError";
// import { useNavigate } from "react-router-dom";


const CardTemplate = (props) => {
  const {id, icon, color, title, status, date, content, tags, actions} = props;
  const { catchError } = useCatchError();

  // add props to open panel and get form fields
  const { manageEvent, elementEvent } = useEvents({
    ...props, 
    panel: {
      type: "form", 
      title: title,
      size: "large",
      buttons: [{label: "cancel", type: "default", action: "reset"}, {label: "submit", type: "primary", action: "submit"} ],
      content: {
        element: "FormGenerator",
        props: {
          fieldsEndpoint: actions?.find(el => el.verb === "get")?.path
        }
      }
    },
  });
  const [deleteContent, {isError: isErrorDelete, error}] = useDeleteContentMutation();
  
  // const navigate = useNavigate();
  // const onChangePage = () => {
  //   navigate(id.toString())
  // }

  const onClick = () => {
    // Card template open always a panel with a form by endpoint
    if (isAllowed("get"))
      manageEvent();
  }

  const isAllowed = (verb) => {
    return actions?.find(el => el.verb === verb) !== undefined
  }

  const onDeleteAction = async () => {
    const endpoint = actions?.find(el => el.verb === "delete")?.path;
    await deleteContent({endpoint: endpoint});
  }

  useEffect(() => {
    if (isErrorDelete) {
      catchError(error);
    }
  }, [catchError, error, isErrorDelete]);

  return (
    <>
      {elementEvent}
      <Card
        key={id}
        onClick={onClick}
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
          <Button key='2' onClick={(e) => {e.stopPropagation(); onDeleteAction()}} icon={<DeleteOutlined />} type="text" disabled={!isAllowed("delete")} />
        ]}
      >
        {content}
      </Card>
    </>
  )
}

export default CardTemplate;