export const getConnections = async () => {
  try {
    const response = await fetch(`
      ${process.env.VUE_APP_SERVER_ENDPOINT}/api/connections`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
