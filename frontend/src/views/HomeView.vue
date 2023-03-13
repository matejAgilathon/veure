<template>
  <div class="home">
    <img src="../assets/app-logo.png" alt="veure logo" />
    <button @click="getStarted">Get started</button>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    getStarted() {
      this.$store.commit("direct", this);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

button {
  width: 10em;
  height: 2em;
  border: 1px solid #777;
  box-shadow: 5px 5px #999;
  border-radius: 5px;
  background-color: #fff;
  &:hover {
    background-color: #eee;
    cursor: pointer;
  }
}
img {
  width: 7em;
}
</style>
