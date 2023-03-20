<template>
  <div class="connections">
    <input class="filter" type="text" placeholder="Search" v-model="search" />
    <div class="connections-list">
      <p v-if="!connections.length">
        No connections found. Go to the Add new connections page to add new
        connections.
      </p>
      <div
        v-else
        v-for="connection in filteredConnections"
        :key="connection.id"
        @click="($event) => connectionProfile(connection.id)"
      >
        <img
          class="grayed-out"
          :src="connection.picture"
          :alt="connection.username"
        />
        <p>{{ connection.username }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getConnections } from "@/utils/getConnections";
export default {
  name: "ConnectionList",
  data: () => ({
    connections: [],
    search: "",
  }),
  mounted() {
    getConnections(this.$route.path.slice(1)).then((connections) => {
      this.connections = connections;
    });
  },
  computed: {
    filteredConnections() {
      return this.connections
        .filter((connection) => {
          if (!connection.username) return false;
          return connection.username
            .toLowerCase()
            .includes(this.search.toLowerCase());
        })
        .sort((a, b) => {
          return a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1;
        });
    },
  },
  methods: {
    connectionProfile(connectionId) {
      this.$store.commit("getConnection", {
        connectionId,
        router: this.$router,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.connections-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1em;
}

.connections-list > div {
  flex-basis: calc(33.33% - 1em); /* set width to one-third minus gap */
  max-width: calc(33.33% - 1em); /* set max width to one-third minus gap */
}

.filter {
  width: 10em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 0.5em;
  outline: none;
  margin-bottom: 1em;
  margin-right: 1em;
}

img {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 3px solid #ccc;
  box-shadow: 0 0 5px #ccc;
  filter: grayscale(1);
}

img:hover {
  filter: grayscale(0);
}

p {
  font-size: 0.7rem;
}
</style>
