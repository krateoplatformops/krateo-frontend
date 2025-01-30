import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate, RouteObject, useNavigate } from "react-router-dom"
import { logout, selectLoggedUser, setUser } from "../../features/auth/authSlice";
import { useLazyGetContentQuery } from "../../features/common/commonApiSlice";
import { useAppDispatch } from "../../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Page from "../Page/Page";
import Layout from "../Layout/Layout";
import ErrorPage from "../../pages/ErrorPage";
import Profile from "../../pages/Profile";
import { Result, Space, Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const InitRoutes = ({updateRoutes}: {updateRoutes: (routes: RouteObject[]) => void}) => {
  const isRoutesUpdated = useRef<boolean>(false);
  const user = useSelector(selectLoggedUser);
  const userLS = JSON.parse(localStorage.getItem("K_user") ||"{}");
  const [getContent, {data, isSuccess, isLoading, isFetching, isError, error}] = useLazyGetContentQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getRoutes = useCallback(async () => {
    const ls = localStorage.getItem("K_config") || "{}";
    const configJson = JSON.parse(ls);
    if ( configJson?.api?.INIT) {
      await getContent({ endpoint: configJson.api.INIT })
    }
  }, [])

  // Check user logged
  useEffect(() => {
    if (user) {
      if (!isRoutesUpdated.current) {
        // get all routes
        getRoutes()
      }
    } else {
      if (userLS.data) {
        dispatch(setUser(userLS));
      } else {
        // user not logged!
        navigate("/login");
      }
    }
  }, [user])

  useEffect(() => {
    if (isSuccess && data) {
      isRoutesUpdated.current = true;
      if (data?.status?.type?.toLowerCase() === "routes") {
        const routesList = data.status.items?.filter(el => el !== null).map(el => (
          {
            label: el.status.items[0].app.label,
            path: el.status.items[0].app.path,
            icon: <div><FontAwesomeIcon icon={el.status.items[0].app.icon} /></div>,
            endpoint: el.status.items[0].actions ? el.status.items[0].actions[0]?.path : undefined,
            menu: el.status.items[0].app.menu,
          }
        ))

        const routes:RouteObject[] = routesList.map((r) => (
          {
            path: r.path !== "/" ? r.path : undefined,
            index: r.path === "/",
            element: <Page endpoint={r.endpoint} />,
          }
        ));

        let newRoutes: RouteObject[] = [
          {
            path: "/",
            element: <Layout menu={routesList.filter(el => el.menu.toLowerCase() === "true")} />,
            errorElement: <ErrorPage />,
            children: [...routes, {
              path: "/profile",
              element: <Profile />
            } ],
          }
        ]

        // add default page
        if (data.status?.props?.default) {
          newRoutes = [{
            path: "/",
            element: <Navigate to={data.status.props.default} replace={true} />
          }, ...newRoutes]
        }

        updateRoutes(newRoutes)
      }
    }
  }, [data, isSuccess])

  useEffect(() => {
    if (isError && ('status' in error && error.status === 401)) {
      // invalid user logged
      dispatch(logout());
      navigate("/login");
    }
  }, [data, isError])

  return (
    isLoading || isFetching ?
      <Space direction="vertical" size="large" style={{width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
        <Spin indicator={<LoadingOutlined />} size="large" />
        <Typography.Text>Krateo loading app data...</Typography.Text>
      </Space>
    :
    isError ?
      <Result status="error" title="Ops! Something didn't work" subTitle="Unable to retrieve routes data" />
    :
    <></>
  )
}

export default InitRoutes