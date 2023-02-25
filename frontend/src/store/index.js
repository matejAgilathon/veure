import Vue from "vue";
import Vuex from "vuex";

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
  },
  actions: {},
  modules: {},
});
