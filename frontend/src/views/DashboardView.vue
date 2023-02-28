<template>
  <div class="dashboard">
    <div>Hello, {{ $store.state.user.username }}</div>
    <img :src="$store.state.user.userPhotoUrl" alt="user photo" />
    <button @click="testTokenRoute">Test Route</button>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  name: "DashboardView",
  mounted() {
    this.$store.state.user.username = VueCookies.get("username");
    this.$store.state.user.userPhotoUrl = VueCookies.get("picture");
    this.$store.commit("setToken", VueCookies.get("token"));
  },
  methods: {
    testTokenRoute() {
      try {
        const response = fetch(
          `${process.env.VUE_APP_SERVER_ENDPOINT}/testToken`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        );
        const data = response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
