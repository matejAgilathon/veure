<template>
  <div class="home">
    <img src="../assets/app-logo.png" alt="veure logo" />
    <button @click="signInWithGoogle">
      Sign in with
      <span class="google">
        <span>G</span>
        <span>o</span>
        <span>o</span>
        <span>g</span>
        <span>l</span>
        <span>e</span>
      </span>
    </button>
  </div>
</template>

<script>
import { getGoogleUrl } from "../utils/getGoogleUrl";
export default {
  name: "HomeView",
  data() {
    return {
      //
    };
  },
  methods: {
    signInWithGoogle() {
      window.location.replace(getGoogleUrl("/"));
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
  width: 20%;
  height: 5%;
  border: 1px solid #777;
  box-shadow: 5px 5px #999;
  border-radius: 5px;
  background-color: #fff;
  &:hover {
    background-color: #eee;
    cursor: pointer;
  }
  .google {
    span:nth-child(1) {
      color: #4285f4;
    }
    span:nth-child(2) {
      color: #ea4335;
    }
    span:nth-child(3) {
      color: #fbbc05;
    }
    span:nth-child(4) {
      color: #4285f4;
    }
    span:nth-child(5) {
      color: #34a853;
    }
    span:nth-child(6) {
      color: #ea4335;
    }
  }
}
img {
  width: 20%;
}
</style>
