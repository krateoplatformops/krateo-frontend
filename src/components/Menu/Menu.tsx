import { useEffect, useState } from "react"
import { Menu as AntMenu, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import styles from "./styles.module.scss";

const Menu = ({data}) => {
  const [items, setItems] = useState<MenuProps['items']>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState(location.pathname);

  useEffect(() => {
    const menuItems: MenuProps['items'] = data.map((el) => (
      {
        label: el.label,
        icon: el.icon,
        key: el.path
      }
    ))
    if (menuItems)
      setItems(menuItems);
  }, [data])

  useEffect(() => {
    data?.forEach((el) => {
      if (location.pathname.indexOf(el.path) > -1) {
        setCurrentRoute(el.path);
      }
    })
  }, [data, items, location])

  const changeRoute = (key: string) => {
    navigate(key);
  }

  return (
    <section className={styles.menuBar}>
      <img className={styles.logo} src={logo} alt="Krateo DevOpsApp" />
      <AntMenu
        className={styles.menu}
        defaultSelectedKeys={[location.pathname]}
        onClick={(e) => changeRoute(e.key)}
        mode="inline"
        items={items}
        selectedKeys={[currentRoute]}
      />
    </section>
  )
}

export default Menu;