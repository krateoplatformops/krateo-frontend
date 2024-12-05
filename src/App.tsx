import { useCallback, useEffect, useRef, useState } from "react"
import { RouterProvider, createBrowserRouter, RouteObject, Navigate } from "react-router-dom";
import Skeleton from "./components/Skeleton/Skeleton";
import Page from "./components/Page/Page"
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout/Layout";
import Page404 from "./pages/Page404";
import LayoutLogin from "./components/LayoutLogin/LayoutLogin";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { App as AntApp, Flex, Space, Spin, Typography } from "antd";
import AuthGitHub from "./pages/Auth/AuthGitHub";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import AuthOidc from "./pages/Auth/AuthOidc";
import { useLazyGetContentQuery } from "./features/common/commonApiSlice";
import useCatchError from "./utils/useCatchError";
import logo from "./assets/images/logo_black.png";
import { useSelector } from "react-redux";
import { selectLoggedUser, setUser } from "./features/auth/authSlice";
import { useAppDispatch } from "./redux/hooks";

library.add(fas, far)

function App() {

  const basicRoutes = [
    {
      path: "/login",
      element: <LayoutLogin />,
      children: [
        {
          index: true,
          element: <Login />
        }
      ]
    },
    {
      path: "/auth/github",
      element: <AuthGitHub />,
    },
    {
      path: "/auth/oidc",
      element: <AuthOidc />,
    },
    {
      path: "/",
      element: <></>,
      errorElement: <ErrorPage />,
      children: [],
    },
    {
      path: "*",
      element: <Navigate to="/" />
    }
  ]
  const [router, setRouter] = useState<RouteObject[]>(basicRoutes);
  const [getContent, {data, isSuccess, isLoading, isFetching, isError, error}] = useLazyGetContentQuery();
  const { catchError } = useCatchError();
  const user = useSelector(selectLoggedUser);
  const userLS = JSON.parse(localStorage.getItem("K_user") ||"{}");
  const isRoutesUpdated = useRef<boolean>(false);

  const dispatch = useAppDispatch();

  // Init app
  useEffect(() => {
    const getConfig = async () => {
      const configFile = await fetch("/config/config.json");
      const configJson = await configFile.json();
      localStorage.setItem("K_config", JSON.stringify(configJson));
      console.log(configJson)
    }

    getConfig()
  }, [])

  // Check user logged
  useEffect(() => {
    if (user) {
      if (!isRoutesUpdated.current) {
        // get all routes
        updateRoutes()
      }
    } else {
      if (userLS.data) {
        dispatch(setUser(userLS));
      }
    }
  }, [user, router])

  const updateRoutes = useCallback(async () => {
    const ls = localStorage.getItem("K_config") || "{}";
    const configJson = JSON.parse(ls);
    if ( configJson?.api?.INIT) {
      await getContent({ endpoint: configJson.api.INIT })
    }
  }, [])

  useEffect(() => {
    if (isSuccess && data) {
      isRoutesUpdated.current = true;
      if (data?.status?.type?.toLowerCase() === "menu") {
        const routesList = data.status.items?.map(el => (
          {
            label: el.status.items[0].app.label,
            path: el.status.items[0].app.path,
            icon: <FontAwesomeIcon icon={el.status.items[0].app.icon} />,
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

        let mergedRoutes = router.map(el => {
          if (el.path === "/") return {
            path: "/",
            element: <Layout menu={routesList.filter(el => el.menu.toLowerCase() === "true")} />,
            errorElement: <ErrorPage />,
            children: [...routes, {
              path: "/profile",
              element: <Profile />
            } ],
          }
          else if (el.path === "*") return {
            path: "*",
            element: <Page404 />
          }
          else return el
        })

        // add default page
        if (data.status.default) {
          mergedRoutes = [{
            path: "/",
            element: <Navigate to={data.status.default} replace={true} />,
          }, ...mergedRoutes]
        }

        setRouter(mergedRoutes)
      }
    }
  }, [data, isSuccess])

  useEffect(() => {
    if (isError) {
      catchError(error)
    }
  }, [isError, error])

  return (
    <>
    {
      (isLoading || isFetching) ?
        <Space direction="vertical" size="large" style={{width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
          <Spin size="large" />
          <Typography.Text>Krateo loading app data...</Typography.Text>
        </Space>
      : isError ?
        <Flex justify="center" align="center" style={{height: '100vh'}} vertical gap={10}><img src={logo} alt="Krateo | PlatformOps" width={400} />{catchError(error, "result")}</Flex>
      :
        <AntApp>
          <RouterProvider router={createBrowserRouter(router)} fallbackElement={<Skeleton />} />
        </AntApp>
    }
    </>
  )
}

export default App
