<template>
  <div class="dashboard">
    <nav>
      <div>Hello, {{ $store.state.user.username }}</div>
      <img :src="$store.state.user.userPhotoUrl" alt="user photo" />
      <LogoutButton />
    </nav>
    <ConnectionsList />
    <!-- <button @click="testTokenRoute">Test Route</button> -->
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import LogoutButton from "@/components/LogoutButton";
import ConnectionsList from "@/components/ConnectionsList";

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
    ConnectionsList,
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
  // height: 80vh;
  gap: 1rem;
}
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  // padding: 1rem;
}
//make img round with shadow an border
img {
  // width: 150px;
  // height: 150px;
  height: 2em;
  border-radius: 50%;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px #ccc;
}
</style>
