<!--Profile view including rounded image-->
<template>
  <div class="profile-view">
    <div class="profile-view__image-container">
      <img
        class="profile-view__image"
        :src="userPhotoUrl"
        alt="user profile image"
      />
    </div>
    <div class="profile-view__bio">{{ bio }}</div>
    <div class="profile-view__username">{{ username }}</div>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  computed: {
    username() {
      return this.$store.state.user.username;
    },
    userPhotoUrl() {
      return this.$store.state.user.userPhotoUrl;
    },
    bio() {
      return this.$store.state.user.bio;
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
}
</style>
