<template>
  <div class="home">
    <img src="../assets/app-logo.png" alt="veure logo" />
    <button @click="signInWithGoogle">Sign in with Google</button>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      //
    };
  },
  methods: {
    signInWithGoogle() {
      console.log("Sign in with Google");
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding-top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}
img {
  width: 100px;
}
</style>
