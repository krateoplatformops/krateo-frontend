export const getHeaders = () => {
  const ls = localStorage.getItem("K_user");
  if (ls) {
    const username = ls && JSON.parse(ls)?.user.username;
    const groups = ls && JSON.parse(ls)?.groups || [];
    const group = groups[0];

    return {
      "X-Krateo-User": username,
      "X-Krateo-Groups": group
    }
  } else {
    return undefined
  }
}