import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      userId: "",
      username: "",
      userPhotoUrl: "",
      receivedRequests: [],
    },
    connection: {
      connectionId: "",
      userPhotoUrl: "",
      username: "",
      bio: "",
      connectionStatus: "",
    },
  },
  getters: {},
  mutations: {
    setToken(state, payload) {
      localStorage.setItem("userId", payload.userId);
    },
    direct(state, vi) {
      (async function () {
        try {
          const response = await axios.post(
            `${process.env.VUE_APP_SERVER_ENDPOINT}/api/session/validation`,
            {
              userId: state.user.userId || localStorage.getItem("userId"),
            },
            { withCredentials: true }
          );
          if (response.status === 200) {
            state.user.userPhotoUrl = response.data.userPhotoUrl;
            state.user.username = response.data.username;
            state.user.userId = response.data.userId;
            vi.$router.push("/dashboard");
          }
        } catch (error) {
          console.log("Test connection failed", error);
          vi.$router.push("/login");
        }
      })();
    },
    logout(state, vi) {
      (async function () {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/logout",
            {
              userId: state.user.userId || localStorage.getItem("userId"),
            },
            {
              withCredentials: true,
            }
          );
          if (response.status === 204) {
            state.token = "";
            state.user.username = "";
            state.user.userPhotoUrl = "";
            state.user.userId = "";
            localStorage.clear();
            vi.$router.push("/login");
          }
        } catch (error) {
          console.log("Logout failed", error);
          throw error;
        }
      })();
    },
    getConnection(state, payload) {
      const { router, connectionId } = payload;
      (async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/connections/${connectionId}`,
            {
              withCredentials: true,
            }
          );
          if (response.status === 200) {
            state.connection.connectionId = connectionId;
            state.connection.userPhotoUrl = response.data.picture;
            state.connection.username = response.data.username;
            if (router.currentRoute.path === "/dashboard")
              state.connection.connectionStatus = "connected";
            if (router.currentRoute.path === "/connections")
              state.connection.connectionStatus = "not-connected";
            if (router.currentRoute.path === "/requests")
              state.connection.connectionStatus = "pending";
          }
          router.push(`/users/${connectionId}`);
        } catch (error) {
          console.log("Set connection failed", error);
          throw error;
        }
      })();
    },
    connect(state) {
      (async () => {
        try {
          const response = await axios.post(
            `http://localhost:8000/api/connections/${state.connection.connectionId}`,
            {
              userId: state.user.userId,
            },
            {
              withCredentials: true,
            }
          );
          if (response.status === 201) {
            console.log("Connection request sent");
          }
        } catch (error) {
          console.log("Connection request failed", error);
          throw error;
        }
      })();
    },
    acceptRequest(state) {
      const url = `http://localhost:8000/api/connections/${state.connection.connectionId}`;
      (async () => {
        try {
          const response = await axios.put(
            url,
            {
              userId: state.user.userId,
            },
            {
              withCredentials: true,
            }
          );
          if (response.status === 204) {
            console.log("Accepting connection request successful");
          }
        } catch (error) {
          console.log("Accepting connection request failed", error);
          throw error;
        }
      })();
    },
    rejectRequest(state) {
      (async () => {
        try {
          const response = await axios.delete(
            url,
            {
              userId: state.user.userId,
            },
            {
              withCredentials: true,
            }
          );
          if (response.status === 204) {
            console.log("Rejection successful");
          }
        } catch (error) {
          console.log("Rejection failed", error);
          throw error;
        }
      })();
    },
  },
  actions: {},
  modules: {},
});
