<template>
  <div id="movie-filter">
    <h2>Filter Results</h2>
    <div class="filter-group">
      <check-filter v-for="genre in genres" v-bind:title="genre" @check-filter="checkFilterFilter"></check-filter>
    </div>
  </div>
</template>

<script>
import genres from "../util/genres";
import CheckFilter from "./CheckFilter.vue";

export default {
  data() {
    return {
      genres
    };
  },
  methods: {
    // TODO: consider to rename the variables
    checkFilterFilter(filterCategory, filterTitle, filterCheckedStatus) {
      this.$emit(
        "check-filter",
        filterCategory,
        filterTitle,
        filterCheckedStatus
      );
    }
  },
  components: {
    CheckFilter
  }
};
</script>

<style scoped>
    #movie-filter {
        flex-basis: 25%;
    }
</style>
