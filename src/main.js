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
                        <div v-for="movie in movies" class="movie">{{ movie.title }}</div>
                    </div>`,
      data() {
        return {
          movies: [
            { title: "Home Alone" },
            { title: "Avengers" },
            { title: "The Family" }
          ]
        };
      }
    },
    "movie-filter": {
      data() {
        return {
          genres
        };
      },
      methods: {
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
