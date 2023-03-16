<template>
  <div class="dashboard">
    <nav>
      <div>Add new connections.</div>
      <div>
        <img
          class="profile-image"
          :src="$store.state.user.userPhotoUrl"
          alt="user photo"
        />
        <img
          class="menu-icon"
          :src="menuIcon"
          alt="menu"
          @click="($event) => (menu = !menu)"
        />
      </div>
      <NavBarDropdown v-show="menu" />
    </nav>
    <ConnectionsList />
  </div>
</template>

<script>
import ConnectionsList from "@/components/ConnectionsList";
import NavBarDropdown from "@/components/NavBarDropdown";
import MENU_CLOSE_ICON from "@/assets/close-menu.svg";
import MENU_HAM_ICON from "@/assets/ham-menu.svg";

export default {
  name: "ConnectView",
  data() {
    return {
      menu: false,
    };
  },
  components: {
    ConnectionsList,
    NavBarDropdown,
  },
  computed: {
    menuIcon() {
      return this.menu ? MENU_CLOSE_ICON : MENU_HAM_ICON;
    },
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
  gap: 1rem;
}
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.profile-image {
  margin-right: 1em;
  height: 2em;
  border-radius: 50%;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px #ccc;
}
.menu-icon {
  cursor: pointer;
  width: 2em;
}
</style>
