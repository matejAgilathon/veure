import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: "",
      userPhotoUrl: "",
    },
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    async logout(state) {
      try {
        const response = await axios.post("http://localhost:8000/api/logout", {
          token: state.token,
        });
        state.token = "";
        state.user.username = "";
        state.user.userPhotoUrl = "";
        return response.data;
      } catch (error) {
        console.log("Logout failed", error);
        throw error;
      }
    },
  },
  actions: {},
  modules: {},
});
