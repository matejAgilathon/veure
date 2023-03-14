<template>
  <div class="connections">
    <h1>Connections</h1>
    <!--filter connections -->
    <input class="filter" type="text" placeholder="Search" v-model="search" />
    <!--add new connection -->
    <button class="add-connection-button">Add new</button>
    <!--display connections -->
    <div class="connections-list">
      <div v-for="connection in filteredConnections" :key="connection.id">
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
    // fetch connections from backend
    getConnections().then((connections) => {
      this.connections = connections;
    });
  },
  computed: {
    filteredConnections() {
      return this.connections
        .filter((connection) => {
          return connection.username
            .toLowerCase()
            .includes(this.search.toLowerCase());
        })
        .sort((a, b) => {
          return a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// style logout button
// .logout {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 80vh;
//   gap: 1rem;
// }
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

.add-connection-button {
  width: 10em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 0.5em;
  outline: none;
  margin-bottom: 1em;
  cursor: pointer;
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

//make img round with shadow an border
img {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 3px solid #ccc;
  box-shadow: 0 0 5px #ccc;
}

.grayed-out {
  filter: grayscale(1);
}

p {
  font-size: 0.7rem;
}
</style>
