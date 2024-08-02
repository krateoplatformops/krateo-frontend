export const getBaseUrl = (type: "AUTH" | "BFF" | "EVENTS_PUSH" | "TERMINAL_SOCKET" | "EVENTS" = "BFF") => {
  let baseUrl = "";
  const useConfig = import.meta.env.VITE_USE_CONFIG;
  if (useConfig === "true") {
    const ls = localStorage.getItem("K_config");
    if (ls) {
      const configJson = JSON.parse(ls);
      switch (type) {
        case "AUTH":
          baseUrl = configJson.api.AUTHN_API_BASE_URL;
          break;

        case "BFF":
          baseUrl = configJson.api.BFF_API_BASE_URL;
          break;

        case "EVENTS":
          baseUrl = configJson.api.EVENTS_API_BASE_URL;
          break;
  
        case "EVENTS_PUSH":
          baseUrl = configJson.api.EVENTS_PUSH_API_BASE_URL;
          break;
  
        case "TERMINAL_SOCKET":
          baseUrl = configJson.api.TERMINAL_SOCKET_URL;
          break;
  
        default:
          break;
      }
    }
  }
  return baseUrl;
}

export const getParam = (name: "FRONTEND_NAMESPACE" | "DELAY_SAVE_NOTIFICATION") => {
  let param;

  const useConfig = import.meta.env.VITE_USE_CONFIG;
  if (useConfig === "true") {
    const ls = localStorage.getItem("K_config");
    if (ls) {
      const configJson = JSON.parse(ls);
      switch (name) {
        case "FRONTEND_NAMESPACE":
          param = configJson.params.FRONTEND_NAMESPACE;
          break;

        case "DELAY_SAVE_NOTIFICATION":
          param = configJson.params.DELAY_SAVE_NOTIFICATION;
          break;

        default:
          break;
      }
    }
  }
  return param;
}