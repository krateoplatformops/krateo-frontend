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

  const normalizeRouteParameters = (route: string) => {
    let normalizeRoute = route;
    if (normalizeRoute.endsWith("/")) {
      normalizeRoute = normalizeRoute.slice(0, -1);
    }
    const pattern = /\{([^}]+)\}/g;
    return normalizeRoute.replace(pattern, ":$1");
  }

  useEffect(() => {
    if (isSuccess && data) {
      isRoutesUpdated.current = true;
      if (data?.status?.type?.toLowerCase() === "routes") {
        const routesList = data.status.items?.filter(el => el !== null).map(el => (
          {
            label: el.status.items[0].app.label,
            path: el.status.items[0].app.path ? normalizeRouteParameters(el.status.items[0].app.path) : undefined,
            icon: el.status.items[0].app.icon ? <div><FontAwesomeIcon icon={el.status.items[0].app.icon} /></div> : undefined,
            endpoint: el.status.items[0].app.endpoint ? el.status.items[0].app.endpoint : undefined,
            menu: el.status.items[0].app.menu === "true",
            default: el.status.items[0].app.default === "true",
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
            element: <Layout menu={routesList.filter(el => el.menu)} />,
            errorElement: <ErrorPage />,
            children: [...routes, {
              path: "/profile",
              element: <Profile />
            } ],
          }
        ]

        const defaultRoute = routesList.find(route => route?.default)
        // add default page
        if (defaultRoute) {
          newRoutes = [{
            path: "/",
            element: <Navigate to={defaultRoute.path} replace={true} />
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