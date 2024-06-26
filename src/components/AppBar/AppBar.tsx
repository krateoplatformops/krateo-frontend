import { Space } from 'antd';
import UserLogged from '../UserLogged/UserLogged';

import styles from './styles.module.scss';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { useSelector } from 'react-redux';
import { logout, selectLoggedUser, setUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { useEffect } from 'react';
import Notification from '../Notifications/Notifications';

const AppBar = () => {
  const user = useSelector(selectLoggedUser);
  const userLS = JSON.parse(localStorage.getItem("user") ||"{}");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (user === null && !userLS.data) {
      navigate("/login");
    }
    if (user === null && userLS.data) {
      dispatch(setUser(userLS));
    }
  }, [dispatch, navigate, user, userLS, userLS.data]);

  return (
    <section className={styles.appBar}>
      <Space className={styles.left} direction='horizontal' size='large'>
        <Breadcrumb />
      </Space>
      <Space className={styles.right} direction='horizontal' size='large'>
        <Notification />
        {user &&
          <UserLogged
            fullname={user.displayName !== "" ? user.displayName : user.username}
            role="" // {user.role}
            picture={user.avatarURL}
            onLogout={onLogout}
          />
        }
      </Space>
    </section>
  )
}

export default AppBar;