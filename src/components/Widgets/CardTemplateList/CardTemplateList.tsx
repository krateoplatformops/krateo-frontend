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

const CardTemplateList = (props) => {
  return(
    props.items?.map(item => {
      if (item.status?.content?.length > 0) {
        return item.status.content.map((el, index) => <CardTemplate id={`${item.metadata.uid}_${index}`} key={`${item.metadata.uid}_${index}`} actions={el.actions} {...el} />)
      } else {
        return <CardTemplate id={item.metadata.uid} key={item.metadata.uid} actions={item.actions} {...item.status.content[0]} />
      }
    })
  )
}

const CardTemplate = (props) => {
  const {id, icon, color, title, status, date, content, tags, actions} = props;
  const { catchError } = useCatchError();

  // TEMP: keep until BE send route, endpoint or panel props
  let cardProps = {...props};
  if (!props.route && !props.endpoint && !props.panel && actions?.find(el => el.verb === "get")?.path) {
    // add "panel" props to open panel and get form fields as default CTA of card
    cardProps = {...cardProps,
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
    }
  }
  // END TEMP

  const { manageEvent, elementEvent } = useEvents(cardProps);
  const [deleteContent, {isError: isErrorDelete, error}] = useDeleteContentMutation();

  const onClick = () => {
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
        className={`${styles.card} ${!isAllowed("get") && styles.noLink}`}
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

export default CardTemplateList;