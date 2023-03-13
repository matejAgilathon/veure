<template>
  <div class="dashboard">
    <div>Hello, {{ $store.state.user.username }}</div>
    <img :src="$store.state.user.userPhotoUrl" alt="user photo" />
    <button @click="testTokenRoute">Test Route</button>
    <LogoutButton />
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import LogoutButton from "@/components/LogoutButton";

export default {
  name: "DashboardView",
  created() {
    // this.$store.commit("testConnection");
    this.$store.state.user.username = VueCookies.get("username");
    this.$store.state.user.userPhotoUrl = VueCookies.get("picture");
    this.$store.state.user.userId = VueCookies.get("userId");
    this.$store.commit("setToken", {
      accessToken: VueCookies.get("token"),
      userId: VueCookies.get("userId"),
    });
  },
  components: {
    LogoutButton,
  },
  methods: {
    testTokenRoute() {
      const uri = `${process.env.VUE_APP_SERVER_ENDPOINT}/api/testToken`;
      fetch(uri, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
        body: JSON.stringify({
          username: this.$store.state.user.username,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
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
