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