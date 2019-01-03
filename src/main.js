import Vue from "vue";
import "./style.scss";
import genres from "./util/genres";

new Vue({
  el: "#app",
  methods: {
      checkFilterRoot(filterCategory, filterTitle, filterCheckedStatus) {
          this.$emit('check-filter', filterCategory, filterTitle, filterCheckedStatus);
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
