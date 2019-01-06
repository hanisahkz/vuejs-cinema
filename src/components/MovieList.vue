<template>
  <div id="movie-list">
    <!-- We'll be passing filtered movie object to movie-item via prop -->
    <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie"/>
  </div>
</template>

<script>
import genres from "../util/genres";
import MovieItem from "./MovieItem.vue";

export default {
  props: ["genre", "time", "movies"],
  methods: {
    // Callback function that accepts movie argument
    moviePassesGenreFilter(movie) {
      // If genre array is empty, return true which will display all movies
      if (!this.genre.length) {
        return true;
      } else {
        // If genre is being checked, compare the genre being checked against the genre of movies present and return appropriate boolean value
        // this is using Array#find()
        return this.genre.find(genre => movie.genre === genre);
      }
    }
  },
  // computed properties is used as the values involved need to be recalculated as DOM changes occur
  computed: {
    // Logic to only show the filtered movie list instead of all movies
    filteredMovies() {
      // This is using array filter method that accepts callback function
      // The array contains list of movies
      return this.movies.filter(this.moviePassesGenreFilter);
    }
  },
  components: {
      MovieItem
  }
};
</script>

<style scoped>
#movie-list {
  flex-basis: 75%;
}
</style>