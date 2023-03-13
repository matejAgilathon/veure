<template>
  <button class="logout" @click="logout">Logout</button>
</template>

<script>
export default {
  name: "LogoutButton",
  methods: {
    logout() {
      this.$store.commit("logout", this);
      // this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
// style logout button
.logout {
  cursor: pointer;
  border-radius: 0.3rem;
  border-color: 1px solid #ccc;
  box-shadow: 1px 1px 1px #000;
}
</style>
