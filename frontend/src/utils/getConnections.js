import axios from "axios";

export const getConnections = async (route) => {
  try {
    const response = await axios.get(
      `${process.env.VUE_APP_SERVER_ENDPOINT}/api/connections${
        route === "/connections/new" ? "/new" : ""
      }`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
