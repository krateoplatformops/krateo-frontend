import { BellFilled } from "@ant-design/icons";
import { Badge, Button, Drawer, List, Space, theme, Typography } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { appendNotification, NotificationType, selectNotifications, setNotifications } from "../../features/notifications/notificationsSlice";
import styles from './styles.module.scss';
import { useNavigate } from "react-router-dom";
import { useGetNotificationsQuery } from "../../features/notifications/notificationApiSlice";
import Skeleton from "../Skeleton/Skeleton";
import { getBaseUrl } from "../../utils/config";
import { formatISODate } from "../../utils/dateTime";

const Notification = () => {
  const [showNotificationPanel, setShowNotificationPanel] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data, isSuccess, isLoading } = useGetNotificationsQuery();

  const dispatch = useAppDispatch();
  const notifications = useSelector((state: RootState) => selectNotifications(state));

  const { useToken } = theme;
  const { token } = useToken();

  // save data on Redux
  useEffect(() => {
    if (isSuccess && data) {
      const notifications: NotificationType[] = data.map(el => (
        {
          uid: el.metadata.uid,
          type: el.type,
          title: el.metadata.creationTimestamp && formatISODate(el.metadata.creationTimestamp, true),
          description: el.message,
          date: el.metadata.creationTimestamp,
          url: getNotificationURL(el),
          name: el.involvedObject.name,
          namespace: el.involvedObject.namespace,
          apiVersion: el.involvedObject.apiVersion,
          kind: el.involvedObject.kind,
        }
      ));

      dispatch(setNotifications({data: notifications}));
    }
    // const mockData: NotificationType[] = [
    //   {
    //     uid: "1234567890",
    //     type: "templates",
    //     title: "Lorem ipsum",
    //     description: "Lorem ipsum dolor sit amet",
    //     toRead: true,
    //   },
    //   {
    //     uid: "1234567891",
    //     type: "compositions",
    //     title: "Lorem ipsum",
    //     description: "Lorem ipsum dolor sit amet",
    //     toRead: false,
    //   },
    //   {
    //     uid: "1234567892",
    //     type: "templates",
    //     title: "Lorem ipsum",
    //     description: "Lorem ipsum dolor sit amet",
    //     toRead: true,
    //   },
    // ];

    // dispatch(setNotifications({ data: mockData }));
  }, [data, dispatch, isSuccess])

  const onClickNotification = (el: NotificationType) => {
    if (el.url?.length > 0) {
      navigate(el.url)
    }
  }

  const getNotificationURL = (el) => {
    const url = "";
    // se è presente compositionId allora è un composition (ex deployment)

    /** NB: non è possibile puntare a una composition se è necessario passare l'endpoint nella querystring
     *    per mantenere questa soluzione è necessario ricevere l'endpoint per costruire correttamente l'URL
     * 
     */
    // TEMPORANEMENTE DISABILITATO
    if (el.compositionId && el.compositionId !== "") {
    //   url = `/compositions/${el.compositionId}?tabKey=events`; // <-- nel tab Events
    }
    return url;
  }

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource(`${getBaseUrl("EVENTS_PUSH")}/notifications`, {
      withCredentials: false,
    });
    
    eventSource.addEventListener("krateo", (event) => {
      const data = JSON.parse(event.data);

      const notification: NotificationType = {
        uid: data.metadata.uid,
        date: data.metadata.creationTimestamp,
        title: formatISODate(data.metadata.creationTimestamp, true),
        type: data.type,
        description: data.message,
        url: getNotificationURL(data),
        name: data.involvedObject.name,
        namespace: data.involvedObject.namespace,
        kind: data.involvedObject.kind,
        apiVersion: data.involvedObject.apiVersion,
      }

      dispatch(appendNotification(notification));
    });

    // terminating the connection on component unmount
    return () => eventSource.close();
  }, [dispatch]);

  return (
    <div className={styles.notifications}>
      <Badge className={styles.badge} count={notifications.length}>
        <Button
          className={styles.toolButton}
          type="link"
          shape="circle"
          onClick={() => setShowNotificationPanel(true)}
          icon={<BellFilled />}
        />
      </Badge>

      <Drawer
        open={showNotificationPanel}
        className={styles.notificationPanel}
        onClose={() => setShowNotificationPanel(false)}
        title="Notifications"
        width={550}
      >
        {
          isLoading && <Skeleton />
        }
        {
          !isLoading && (
            <List
              className={styles.notificationList}
              dataSource={notifications}
              renderItem={(item) => {
                return (
                  <List.Item
                    key={item.uid}
                  >
                    <Button className={styles.notificationElement} type="link" onClick={() => onClickNotification(item)}>
                      <Space direction='vertical'>
                        <Badge color={item.type === "Normal" ? token.colorInfo : token.colorWarning} text={
                          <Typography.Text className={styles.title} strong>{item.title}</Typography.Text>
                        } />
                        <Typography.Text className={styles.description}>{item.description}</Typography.Text>
                        <Typography.Paragraph className={styles.details}>{`${item.apiVersion}.${item.kind}/${item.name}@${item.namespace}`}</Typography.Paragraph>
                      </Space>
                    </Button>
                  </List.Item>
                )
              }}
            />    
          )
        }
      </Drawer>
    </div>
  )
}

export default Notification;