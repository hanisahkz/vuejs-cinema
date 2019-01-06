<template>
  <div id="movie-list">
      <div v-if="filteredMovies.length">
        <!-- We'll be passing filtered movie object to movie-item via prop -->
        <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie"/>
      </div>
      <!-- When data loaded from server, movies will have length -->
      <div v-else-if="movies.length" class="no-results">
          No results found.
      </div>
      <div v-else class="no-reulsts">
          Loading...
      </div>
    
  </div>
</template>

<script>
import genres from "../util/genres";
import MovieItem from "./MovieItem.vue";
import { rejects } from "assert";

export default {
  props: ["genre", "time", "movies"],
  methods: {
    // Callback function that accepts movie argument
    moviePassesGenreFilter(movie) {
      // If genre array is empty, return true which will display all movies
      if (!this.genre.length) {
        return true;
      } else {
        // Logic has to be update based on how data are structured in api_sample.json:
        // i) movie.movie.Genre, ii) movie.movie.Genre has more than 1 entry separated by ','
        let movieGenres = movie.movie.Genre.split(", ");
        let matched = true;

        // Array#forEach to iterate over the checking
        this.genre.forEach(genre => {
          // Check whether the genre checked is present in movieGenres array belong to the dataset
          // If the genre(s) checked don't match anything, ie returns -1, then return false i.e don't return anything
          if (movieGenres.indexOf(genre) === -1) {
            matched = false;
          }
        });
        return matched;
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