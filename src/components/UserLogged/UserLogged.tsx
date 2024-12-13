import { Avatar, Divider, Flex, Menu, Popover, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

type UserLoggedProps = {
  fullname: string;
  role: string;
  groups: string[];
  picture?: string;
  onLogout: () => void;
}

const UserLogged = ({fullname, role, groups, picture, onLogout}: UserLoggedProps) => {
  const arr = fullname.split(" ");
  const sign  = `${arr[0][0]}${arr[arr.length-1][0]}`;

  const items: MenuProps['items'] = [
    {
      label: <Link to="/profile">Profile</Link>,
      key: '0',
    },
    {
      label: <Link to="">Logout</Link>,
      key: '1',
      onClick: onLogout
    },
  ];

  return (
    <Popover
      className={styles.userLogged}
      placement="topLeft"
      arrow={false}
      trigger='click'
      content={
        <section className={styles.panel}>
          <Flex className={styles.userData} align='center' vertical gap={20}>
            <Avatar
              size={80}
              gap={2}
              src={picture}
            >
              <Typography.Text className={styles.sign}>{sign}</Typography.Text>
            </Avatar>

            <Flex align='center' vertical className={styles.details} gap={3}>
              <Typography.Text className={styles.fullname}>{fullname}</Typography.Text>
              <Typography.Text className={styles.role}>{role}</Typography.Text>
              <Typography.Text className={styles.groups}>{groups.join(", ")}</Typography.Text>
            </Flex>  
          </Flex>

          <Menu style={{border: 'none'}}
            mode="vertical"
            selectable={false}
            items={items}
          />
        </section>
      }
    >
      <div>
        <Avatar
          size="default"
          gap={2}
          src={picture}
        >
          <Typography.Text>{sign}</Typography.Text>
        </Avatar>
      </div>
    </Popover>
  )
}

export default UserLogged;