<template>
  <div class="navbar-dropdown">
    <div @click="($event) => $router.push(`/${navRouteName}`)">
      Go to {{ navRouteName }}
    </div>
    <div
      v-show="!isRouteRequests"
      @click="($event) => $router.push('/requests')"
    >
      Received requests
      <span>{{ receivedRequests }}</span>
    </div>
    <LogoutButton />
  </div>
</template>

<script>
import LogoutButton from "@/components/LogoutButton";
export default {
  name: "NavBarDropdown",
  components: {
    LogoutButton,
  },
  computed: {
    navRouteName() {
      return this.$route.path === "/dashboard" ? "connections" : "dashboard";
    },
    username() {
      return this.$store.state.user.username;
    },
    userPhotoUrl() {
      return this.$store.state.user.userPhotoUrl;
    },
    receivedRequests() {
      return this.$store.state.user.receivedRequests.length || "";
    },
    isRouteRequests() {
      return this.$route.path === "/requests";
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-dropdown {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 1em;
  justify-content: center;
  background-color: #fff;
  border-radius: 0.3rem;
  box-shadow: 1px 1px 1px #000;
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  top: 3.5rem;
  right: 0;
  z-index: 1;
  cursor: pointer;
  &__user {
    display: flex;
    align-items: center;
    justify-content: center;
    &__photo {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
    &__name {
      font-size: 1.2rem;
    }
  }
  &__connections {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  &__logout {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>
