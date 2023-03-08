<template>
  <div class="logout">
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "LogoutButton",
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
// style logout button
.logout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  gap: 1rem;
}
</style>
