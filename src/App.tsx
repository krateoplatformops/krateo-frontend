import { useEffect, useState } from "react"
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
import { App as AntApp, /* Space, Spin, Typography, message */ } from "antd";
import AuthGitHub from "./pages/Auth/AuthGitHub";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far)

function App() {
  const [router, setRouter] = useState<RouteObject[]>([]);

  useEffect(() => {
    const getConfig = async () => {
      const configFile = await fetch("/config/config.json");
      const configJson = await configFile.json();
      localStorage.setItem("K_config", JSON.stringify(configJson));

      createRoutes(configJson)
    }

    getConfig()
  }, [])
  
  const createRoutes = (configJson) => {
    const routesObj = {
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

    const routes:RouteObject[] = routesObj.routes.map((r) => (
      {
        path: r.path !== "/" ? r.path : undefined,
        index: r.path === "/",
        element: r.endpoint ? <Page endpoint={r.endpoint} /> : <Page404 />,
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
                      menu={routesObj.routes.filter(el => el.menu === true)}
                      // notifications={routesObj.notifications}
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
    {
      // (isLoading || isFetching) ?
      //   <Space direction="vertical" size="large" style={{width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
      //     <Spin size="large" />
      //     <Typography.Text>Krateo loading app data...</Typography.Text>
      //   </Space>
      // : (
        router.length > 0 &&
        <AntApp>
          <RouterProvider router={createBrowserRouter(router)} fallbackElement={<Skeleton />} />
        </AntApp>
      // )
    }
    </>
  )
}

export default App
