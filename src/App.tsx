import { useCallback, useEffect, useState } from "react"
import { RouterProvider, createBrowserRouter, RouteObject, Navigate } from "react-router-dom";
import Skeleton from "./components/Skeleton/Skeleton";
import Page from "./components/Page/Page"
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout/Layout";
import Page404 from "./pages/Page404";
import LayoutLogin from "./components/LayoutLogin/LayoutLogin";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { getIcon } from "./utils/icons";
import { useGetAppDataQuery } from "./features/app/appApiSlice";
import { App as AntApp, Space, Spin, Typography, message } from "antd";
import getClientIdFromPath from "./utils/getClientIdFromPath";
import AuthGitHub from "./pages/Auth/AuthGitHub";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far)

function App() {
  const clientId = getClientIdFromPath();
  const [router, setRouter] = useState<RouteObject[]>([]);
  const {/*data,*/ isLoading, isFetching, isError} = useGetAppDataQuery(clientId);
  const [messageApi, contextHolder] = message.useMessage();
  // const messageKey = 'appMessageKey';

  const fetchMockData = useCallback(async (clientId: string) => {
    const configFile = await fetch("/config/config.json");
    const configJson = await configFile.json();
    localStorage.setItem("K_config", JSON.stringify(configJson));
  
    const routes = {
      routes: [
        // {
        //   label: "Dashboard",
        //   path: "/",
        //   icon: getIcon("dashboard"),
        //   endpoint: "/",
        //   menu: true,
        // },
        {
          label: "Templates",
          path: "/templates",
          icon: getIcon('templates'),
          endpoint: `/call?uri=/apis/templates.krateo.io/v1alpha1/namespaces/${configJson.params.FRONTEND_NAMESPACE}/collections/templates-row`,
          menu: true,
        },
        {
          label: "Compositions",
          path: "/compositions",
          icon: getIcon('projects'),
          endpoint: `/call?uri=/apis/templates.krateo.io/v1alpha1/namespaces/${configJson.params.FRONTEND_NAMESPACE}/collections/compositions-row`,
          menu: true,
        },
        {
          path: "/compositions/:compositionID",
          // endpoint: "/call?uri=/apis/templates.krateo.io/v1alpha1/namespaces/demo-system/collections/deployment-fireworksapp-tgz-tablist",
          menu: false,
        },
        // {
        //   path: "/projects/:projectID",
        //   menu: false,
        // },
        // {
        //   path: "/projects/:projectID/:compositionID",
        //   menu: false,
        // },
      ],
      notifications: [
        {
          title: "",
          description: "",
          icon: "",
          new: true,
        }
      ]
    }

    createRoutes(clientId, routes)
  }, []);

  useEffect(() => {
    if (clientId) {
      // get application data (after logged)
      fetchMockData(clientId);
    }
  }, [clientId, fetchMockData]);

  useEffect(() => {
    if (isError) {
      // TEMPORARY DISABLED: 
      // messageApi.open({key: messageKey, type: 'error', content: catchError('application_data_missing')});
    }
  }, [isError, messageApi]);

  const createRoutes = (clientId, data) => {
    const routes:RouteObject[] = data.routes.map((r) => (
      {
        path: r.path !== "/" ? r.path : undefined,
        index: r.path === "/",
        element: <Page clientId={clientId} endpoint={r.endpoint} />,
        handle: r.handle,
      }
    ));
    setRouter(
      [
        {
          path: "/",
          element: <Navigate to="/compositions" replace={true} />,
        },
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
          path: "/",
          element: <Layout
                      menu={data.routes.filter(el => el.menu === true)}
                      // notifications={data.notifications}
                    />,
          errorElement: <ErrorPage />,
          children: [...routes, {
            path: "/profile",
            element: <Profile />
          } ],
        },
        {
          path: "*",
          element: <Page404 />,
        }
      ]
    );
  }

  return (
    <>
    {contextHolder}
    {
      (isLoading || isFetching) ?
        <Space direction="vertical" size="large" style={{width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
          <Spin size="large" />
          <Typography.Text>Krateo loading app data...</Typography.Text>
        </Space>
      : (
        router.length > 0 &&
        <AntApp>
          <RouterProvider router={createBrowserRouter(router)} fallbackElement={<Skeleton />} />
        </AntApp>
      )
    }
    </>
  )
}

export default App
