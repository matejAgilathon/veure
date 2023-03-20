<template>
  <div class="profile-view">
    <div class="profile-view__image-container">
      <img
        class="profile-view__image"
        :src="userPhotoUrl"
        alt="user profile image"
      />
    </div>
    <p class="profile-view__bio">{{ bio }}</p>
    <div class="profile-view__username">{{ username }}</div>
    <div v-if="checkConnectionStatus() === 'pending'">
      <button
        class="profile-view__accept-button"
        @click="($event) => $store.commit('acceptRequest')"
      >
        Accept
      </button>
      <button
        class="profile-view__reject-button"
        @click="($event) => $store.commit('rejectRequest')"
      >
        Reject
      </button>
    </div>
    <div
      v-else-if="checkConnectionStatus() === 'not-connected'"
    >
      <button
        class="profile-view__button"
        @click="($event) => $store.commit('connect')"
      >
        Connect
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserView",
  computed: {
    username() {
      return this.$store.state.connection.username;
    },
    userPhotoUrl() {
      return this.$store.state.connection.userPhotoUrl;
    },
    bio() {
      return this.$store.state.connection.bio;
    },
    checkConnectionStatus() {
      return this.$store.state.connection?.connectionStatus;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__image-container {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 1rem;
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__username {
    font-size: 1.5rem;
    font-weight: 600;
  }
  &__button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
}
</style>
