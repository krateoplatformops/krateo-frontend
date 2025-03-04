import { DeleteOutlined } from "@ant-design/icons";
import { Card, Avatar, Button, Space, Typography, Tag } from "antd";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getColorCode } from "../../../utils/colors";
import useEvents, { EventType } from "../../../hooks/useEvents";
import { useDeleteContentMutation } from "../../../features/common/commonApiSlice";
import { useEffect } from "react";
import useCatchError from "../../../utils/useCatchError";

type CardTemplateType = {
  id: string,
  icon: any,
  color: "blue" | "darkBlue" | "orange" | "gray" | "red" | "green",
  title: string,
  status: string,
  date: string,
  content: JSX.Element,
  tags: string,
  onDelete?: () => void,
}

const CardTemplate = (props: CardTemplateType & EventType) => {
  const {id, icon, color, title, status, date, content, tags } = props;
  const { catchError } = useCatchError();
  let cardProps = {...props};
  let cardActions = [...cardProps.actions!];

  // ROUTE
  if (cardProps.route && cardActions?.find(el => el.verb?.toLowerCase() === "get")?.path) {
    delete cardProps.form;
    delete cardProps.drawer;
    cardProps.route = `${cardProps.route}?endpoint=${cardActions?.find(el => el.verb?.toLowerCase() === "get")?.path.replace(/&/g, "%26")}`;
  }

  else if (!cardProps.route && cardProps.form === "true" && cardActions?.find(el => el.verb?.toLowerCase() === "get")?.path) {
    // open drawer
    cardProps.drawerTitle = props.drawerTitle ? props.drawerTitle : cardProps.title;
  }

  else if (props.drawer === "true" && !cardActions?.find(el => el.verb?.toLowerCase() === "get")?.path) {
    // avoid wrong panel open
    delete cardProps.form;
    delete cardProps.drawer;
  }

  else {
    // no link -> remove action "get" from actions
    cardActions = cardActions.filter(el => el.verb?.toLowerCase() !== "get");
    delete cardProps.form;
    delete cardProps.drawer;
  }

  const { manageEvent, elementEvent } = useEvents(cardProps);
  const [deleteContent, {isSuccess: isErrorSuccess, isLoading: isErrorLoading, isError: isErrorDelete, error}] = useDeleteContentMutation();

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
    if (isErrorSuccess) {
      if (props.onDelete) props.onDelete();
    }
  }, [isErrorSuccess]);

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
          <Button key='2' onClick={(e) => {e.stopPropagation(); onDeleteAction()}} icon={<DeleteOutlined />} type="text" disabled={!isAllowed("delete") || isErrorLoading} />
        ]}
      >
        {content}
      </Card>
    </>
  )
}

export default CardTemplate;