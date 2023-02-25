<template>
  <div class="dashboard">
    <div>Heey {{ $store.state.user.username }}, this is a dashboard</div>
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
      fetch("http://localhost:8000/testToken", {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    },
  },
};
</script>
