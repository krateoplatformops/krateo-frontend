import { BellFilled, DeleteFilled } from "@ant-design/icons";
import { Avatar, Badge, Button, Drawer, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { appendNotification, removeNotification, selectNotifications, setNotificationRead, setNotifications } from "../../features/notifications/notificationsSlice";
import styles from './styles.module.scss';
import { IconCode, getIcon } from "../../utils/icons";
import { useNavigate } from "react-router-dom";
import { useDeleteNotificationMutation, useGetNotificationsQuery } from "../../features/notifications/notificationApiSlice";
import Skeleton from "../Skeleton/Skeleton";
import { getBaseUrl } from "../../utils/api";

type NotificationType = {
  uid: string,
  type: string,
  title: string,
  description: string,
  toRead: boolean,
}

const Notification = () => {
  const [showNotificationPanel, setShowNotificationPanel] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data, isSuccess, isLoading } = useGetNotificationsQuery();
  const [deleteNotification, {isSuccess: isDeleteSuccess, isLoading: isDeleteLoading}] = useDeleteNotificationMutation();

  const dispatch = useAppDispatch();
  const notifications = useSelector((state: RootState) => selectNotifications(state));
  const [notificationToDelete, setNotificationToDelete] = useState<string>();

  // save data on Redux
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setNotifications({data}));
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
    //     type: "deployments",
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

  const onDelete = async (id: string) => {
    await deleteNotification(id);
    setNotificationToDelete(id);
  }

  const onClickNotification = (el: NotificationType) => {
    // set as read
    dispatch(setNotificationRead(el.uid));

    switch (el.type) {
      case "templates": 
        navigate(`/templates/${el.uid}`)
      break;

      case "deployments":
        navigate(`/deployments/${el.uid}`)
      break;

      default:

      break;
    }
  }

  useEffect(() => {
    if (isDeleteSuccess && notificationToDelete) {
      dispatch(removeNotification(notificationToDelete)); // deleteData is the element ID deleted
    }
  }, [dispatch, isDeleteSuccess, notificationToDelete]);

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource(`${getBaseUrl()}/notifications`);
    
    // attaching a handler to receive message events
    eventSource.onmessage = (event) => {
      const newEvents = JSON.parse(event.data);
      dispatch(appendNotification(newEvents));
    };
    
    // terminating the connection on component unmount
    return () => eventSource.close();
  }, [dispatch]);

  return (
    <div className={styles.notifications}>
      <Badge className={styles.badge} count={notifications.filter(el => el.toRead).length}>
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
        onClose={() => setShowNotificationPanel(false)}
        title="Notifications"
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
                    actions={[
                      <Button loading={item.uid === notificationToDelete && isDeleteLoading} type="text" shape='circle' icon={<DeleteFilled />} onClick={() => onDelete(item.uid)} />
                    ]}
                  >
                    <Space style={{width: '100%'}} wrap>
                      <Button className={styles.notificationElement} type="link" onClick={() => onClickNotification(item)}>
                        {item.type !== undefined && <Avatar className={styles.icon} icon={getIcon(item.type as IconCode)} />}
                        <Space direction='vertical'>
                          <Typography.Text strong={item.toRead} className={styles.title}>{item.title}</Typography.Text>
                          <Typography.Text className={styles.description} ellipsis={true}>{item.description}</Typography.Text>
                        </Space>
                      </Button>
                    </Space>
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