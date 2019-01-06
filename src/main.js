import Vue from "vue";
import "./style.scss";

import MovieList from "./components/MovieList.vue";
import MovieFilter from "./components/MovieFilter.vue";

new Vue({
  el: "#app",
  data: {
    genre: [],
    time: []
  },
  methods: {
    // All of the data here obtained from onClick event from the child component and being passed to the parent
    checkFilterRoot(filterCategory, filterTitle, filterCheckedStatus) {
      // When filterCheckedStatus is true, add the corresponding filter title to genre array
      // TODO: to further understand this part
      if (filterCheckedStatus) {
        this[filterCategory].push(filterTitle);
      } else {
        // if the filter category is being unchecked && the filter title is non-existent, then remove the filter title
        let index = this[filterCategory].indexOf(filterTitle);
        // if the title isnt present (hence, the value -1)
        if (index > -1) {
          this[filterCategory].splice(index, 1);
        }
      }
    }
  },
  components: {
    MovieList,
    MovieFilter
  }
});
