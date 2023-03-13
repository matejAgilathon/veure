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
        <img :src="connection.picture" :alt="connection.username" />
        <p>{{ connection.username }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConnectionList",
  data: () => ({
    connections: [
      {
        id: 33,
        username: "Joso Udlaga",
        picture:
          "https://pbs.twimg.com/profile_images/1535659158523068419/K4tLjf8C_400x400.jpg",
      },
      {
        id: 83,
        username: "Jack Sparrow",
        picture:
          "https://vignette.wikia.nocookie.net/disney/images/9/90/Pirates4JackSparrowPosterCropped.jpg/revision/latest?cb=20151120172626",
      },
      {
        id: 133,
        username: "Tony Stark",
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Robert_Downey%2C_Jr._2012.jpg/1200px-Robert_Downey%2C_Jr._2012.jpg",
      },
      {
        id: 34,
        username: "Joso Udlaga",
        picture:
          "https://pbs.twimg.com/profile_images/1535659158523068419/K4tLjf8C_400x400.jpg",
      },
      {
        id: 84,
        username: "Jack Sparrow",
        picture:
          "https://vignette.wikia.nocookie.net/disney/images/9/90/Pirates4JackSparrowPosterCropped.jpg/revision/latest?cb=20151120172626",
      },
      {
        id: 134,
        username: "Tony Stark",
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Robert_Downey%2C_Jr._2012.jpg/1200px-Robert_Downey%2C_Jr._2012.jpg",
      },
      {
        id: 35,
        username: "Joso Udlaga",
        picture:
          "https://pbs.twimg.com/profile_images/1535659158523068419/K4tLjf8C_400x400.jpg",
      },
      {
        id: 85,
        username: "Jack Sparrow",
        picture:
          "https://vignette.wikia.nocookie.net/disney/images/9/90/Pirates4JackSparrowPosterCropped.jpg/revision/latest?cb=20151120172626",
      },
      {
        id: 135,
        username: "Tony Stark",
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Robert_Downey%2C_Jr._2012.jpg/1200px-Robert_Downey%2C_Jr._2012.jpg",
      },
      {
        id: 36,
        username: "Joso Udlaga",
        picture:
          "https://pbs.twimg.com/profile_images/1535659158523068419/K4tLjf8C_400x400.jpg",
      },
      {
        id: 86,
        username: "Jack Sparrow",
        picture:
          "https://vignette.wikia.nocookie.net/disney/images/9/90/Pirates4JackSparrowPosterCropped.jpg/revision/latest?cb=20151120172626",
      },
      {
        id: 136,
        username: "Tony Stark",
        picture:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Robert_Downey%2C_Jr._2012.jpg/1200px-Robert_Downey%2C_Jr._2012.jpg",
      },
    ],
    search: "",
  }),
  computed: {
    filteredConnections() {
      return this.connections.filter((connection) => {
        return connection.username
          .toLowerCase()
          .includes(this.search.toLowerCase());
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
  border: 1px solid #ccc;
  box-shadow: 0 0 5px #ccc;
}
</style>
