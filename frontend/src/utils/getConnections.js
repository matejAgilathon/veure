import axios from "axios";

export const getConnections = async (route) => {
  try {
    const routes = {
      dashboard: "old",
      connections: "new",
      requests: "requests",
    };
    const response = await axios.get(
      `${process.env.VUE_APP_SERVER_ENDPOINT}/api/connections?type=${routes[route]}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
