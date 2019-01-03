import Vue from "vue";
import "./style.scss";
import genres from "./util/genres";

new Vue({
  el: "#app",
  data: {
    genre: [],
    time: []
  },
  methods: {
    //   All of the data here obtained from onClick event from the child component and being passed to the parent
      checkFilterRoot(filterCategory, filterTitle, filterCheckedStatus) {
        //   When filterCheckedStatus is true, add the corresponding filter title to genre array
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
    "movie-list": {
      template: `<div id="movie-list">
                        <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}</div>
                    </div>`,
      data() {
        return {
          movies: [
            { title: "Home Alone", genre: genres.COMEDY },
            { title: "Avengers", genre: genres.FANTASY },
            { title: "The Family", genre: genres.DOCUMENTARY}
          ]
        };
      },
      props: ['genre', 'time'],
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
      }
    },
    "movie-filter": {
      data() {
        return {
          genres
        };
      },
      methods: {
        // TODO: consider to rename the variables
        checkFilterFilter(filterCategory, filterTitle, filterCheckedStatus) {
            this.$emit('check-filter', filterCategory, filterTitle, filterCheckedStatus);
        }
      },
      template: `<div id="movie-filter">
                        <h2>Filter Results</h2>
                        <div class="filter-group">
                            <check-filter v-for="genre in genres" v-bind:title="genre" @check-filter="checkFilterFilter"></check-filter>
                        </div>
                    </div>`,
      components: {
        "check-filter": {
          data() {
              return {
                checked: false
              };
          },
          methods: {
            checkFilterChildren() {
                this.checked = !this.checked;
                // Param 1: custom event name, Param 2: the kind of filter which is genre, Param 3: props of interest, Param 4: data property 
                this.$emit('check-filter', 'genre', this.title, this.checked);
            }
          },
          props: ["title"],
          template: `<div v-bind:class="{ 'check-filter' : true, 'active' : checked }" @click="checkFilterChildren">
                        <span class="checkbox"></span>
                        <span class="check-filter-title">{{ title }}</span>
                    </div>`
        }
      }
    }
  }
});
