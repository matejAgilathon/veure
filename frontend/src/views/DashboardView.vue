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
        const uri = `${process.env.VUE_APP_SERVER_ENDPOINT}/api/testToken`;
        const response = fetch(uri, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        });
        const data = response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  gap: 1rem;
}
//make img round with shadow an border
img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px #ccc;
}
</style>
