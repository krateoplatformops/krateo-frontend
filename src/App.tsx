import { useEffect, useMemo, useState } from "react";
import { RouterProvider, createBrowserRouter, RouteObject } from "react-router-dom";
import Skeleton from "./components/Skeleton/Skeleton";
import ErrorPage from "./pages/ErrorPage";
import Page404 from "./pages/Page404";
import LayoutLogin from "./components/LayoutLogin/LayoutLogin";
import Login from "./pages/Login";
import { App as AntApp } from "antd";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import InitRoutes from "./components/InitRoutes/InitRoutes";
import Auth from "./pages/Auth/Auth";

library.add(fas, far, fab);

function App() {
  console.log("🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮🤮");
  const [router, setRouter] = useState<RouteObject[]>([]);
  const updateRoutes = (newRoutes) => {
    // merge new routes with basic routes
    const mergedRoutes = [
      ...newRoutes,
      ...basicRoutes.filter((el) => el.path !== "*"),
      {
        path: "*",
        element: <Page404 />,
      },
    ];
    //update routes
    setRouter(mergedRoutes);
  };

  const basicRoutes = useMemo(
    () => [
      {
        path: "/login",
        element: <LayoutLogin />,
        children: [
          {
            index: true,
            element: <Login />,
          },
        ],
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "*",
        element: <InitRoutes updateRoutes={updateRoutes} />,
        errorElement: <ErrorPage />,
      },
    ],
    []
  );

  // Init app
  useEffect(() => {
    const getConfig = async () => {
      const configFile = await fetch("/config/config.json");
      const configJson = await configFile.json();
      localStorage.setItem("K_config", JSON.stringify(configJson));
      console.log(configJson);
      if (router?.length === 0) setRouter(basicRoutes);
    };
    getConfig();
  }, []);

  return (
    router.length > 0 && (
      <AntApp>
        <RouterProvider router={createBrowserRouter(router)} fallbackElement={<Skeleton />} />
      </AntApp>
    )
  );
}

export default App;
