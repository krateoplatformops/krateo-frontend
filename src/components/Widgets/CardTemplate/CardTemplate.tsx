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
  let cardProps = {...props};
  let cardActions = [...actions];

  // ROUTE
  if (cardProps.route && cardActions?.find(el => el.verb?.toLowerCase() === "get")?.path) {
    delete cardProps.panel; // keep "panel: true" only
    cardProps.route = `${cardProps.route}?endpoint=${cardActions?.find(el => el.verb?.toLowerCase() === "get")?.path.replace(/&/g, "%26")}`;
  }

  // TEMP: PANEL should be an object with a content (eg: FormGenerator) instead of boolean value
  else if (!cardProps.route && !cardProps.endpoint && cardProps.panel === "true" && cardActions?.find(el => el.verb?.toLowerCase() === "get")?.path) {
    // add "panel" props to open panel and get form fields as default CTA of card
    cardProps = {...cardProps,
      panel: {
        type: "form",
        title: title,
        size: "large",
        buttons: [{label: "reset", type: "default", action: "reset"}, {label: "submit", type: "primary", action: "submit"} ],
        content: {
          element: "FormGenerator",
          props: {
            fieldsEndpoint: cardActions?.find(el => el.verb?.toLowerCase() === "get")?.path
          }
        }
      },
    }
  } 
  else if (props.panel === "true" && !cardActions?.find(el => el.verb?.toLowerCase() === "get")?.path) {
    // avoid wrong panel open
    delete cardProps.panel;
  }

  else {
    // no link -> remove action "get" from actions
    cardActions = cardActions.filter(el => el.verb?.toLowerCase() !== "get");
    delete cardProps.panel;
  }
  // END TEMP

  const { manageEvent, elementEvent } = useEvents(cardProps);
  const [deleteContent, {isError: isErrorDelete, error}] = useDeleteContentMutation();

  const onClick = () => {
    if (isAllowed("get"))
      manageEvent();
  }

  const isAllowed = (verb) => {
    return cardActions?.find(el => el.verb?.toLowerCase() === verb) !== undefined
  }

  const onDeleteAction = async () => {
    const endpoint = cardActions?.find(el => el.verb?.toLowerCase() === "delete")?.path;
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
                <div className={styles.status} style={{ color: getColorCode(color) }}>{status}</div>
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