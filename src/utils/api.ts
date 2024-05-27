export const getBaseUrl = () => {
  let baseUrl = "";
  const useConfig = import.meta.env.VITE_USE_CONFIG;
  if (useConfig === "true") {
    const ls = localStorage.getItem("K_config");
    if (ls) {
      const configJson = JSON.parse(ls);
      baseUrl = configJson.api.BFF_API_BASE_URL;
    }
  }
  return baseUrl;
}

export const getHeaders = () => {
  const ls = localStorage.getItem("user");
  if (ls) {
    const username = ls && JSON.parse(ls)?.user.username;
    const group = ls && JSON.parse(ls)?.groups[0];

    return {
      "X-Krateo-User": username,
      "X-Krateo-Groups": group
    }
  } else {
    return undefined
  }
}