import { DeleteOutlined } from "@ant-design/icons";
import { Card, Avatar, Button as Button, Space, Typography, Tag, Drawer } from "antd";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getColorCode } from "../../../utils/colors";
import useEvents, { EventType } from "../../../hooks/useEvents";
import { useDeleteContentMutation } from "../../../features/common/commonApiSlice";
import { useEffect, useState } from "react";
import useCatchError from "../../../hooks/useCatchError";

type CardTemplateType = {
  id: string,
  icon: any,
  color: "blue" | "darkBlue" | "orange" | "gray" | "red" | "green",
  title: string,
  status: string,
  date: string,
  content: JSX.Element,
  tags: string,
  drawerTitle?: string,
  additionalButtonLabel?: string, // TEMP: used to show button in card
  additionalDrawerTitle?: string, // TEMP: the drawer title when button clicked
  additionalDrawerContent?: string, // TEMP: the drawer text when button clicked
  onDelete?: () => void,
}

const CardTemplate = (props: CardTemplateType & EventType) => {
  const {id, icon, color, title, status, date, content, tags, additionalButtonLabel, drawerTitle, additionalDrawerTitle, additionalDrawerContent } = props;
  const { catchError } = useCatchError();
  let cardProps = {...props};
  let cardActions = [...cardProps.actions!];
  const [showPanel, setShowPanel] = useState<boolean>(false);

  const { Title, Paragraph } = Typography;

  // ROUTE
  if (cardProps.route && cardActions?.find(el => el.verb?.toLowerCase() === "get")?.path) {
    delete cardProps.form;
    delete cardProps.drawer;
    cardProps.route = `${cardProps.route}?endpoint=${cardActions?.find(el => el.verb?.toLowerCase() === "get")?.path.replace(/&/g, "%26")}`;
  }

  else if (!cardProps.route && cardProps.form === "true" && cardActions?.find(el => el.verb?.toLowerCase() === "get")?.path) {
    // open drawer
    cardProps.drawerTitle = drawerTitle ? drawerTitle : cardProps.title;
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
              <Title className={styles.title} ellipsis level={2} title={title}>{title}</Title>
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
        <Paragraph>{content}</Paragraph>
        {additionalButtonLabel && additionalDrawerContent && <Button type="link" className={styles.buttonLink} onClick={(e) => {e.stopPropagation(); setShowPanel(true)}}>{additionalButtonLabel}</Button>}
      </Card>
      
      { additionalDrawerContent &&
        <Drawer
          open={showPanel}
          onClose={() => setShowPanel(false)}
          title={additionalDrawerTitle}
        >
          <Paragraph>{additionalDrawerContent}</Paragraph>
        </Drawer>
      }
    </>
  )
}

export default CardTemplate;