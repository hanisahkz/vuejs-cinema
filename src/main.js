// Dependencies
import Vue from "vue";
import "./style.scss";

// Dependency context - this library was built specifically for Vue. Which is why it can use Vue.use()
// Vue.use() allows the module variables (?) to be used globally
import VueResource from "vue-resource";
Vue.use(VueResource);

// Dependency context - this is a general JS library which can be used in Vue or React etc.
// So, it can't be used like so: Vue.use(moment). Due to this, have to find an alternative way to define it
// as a global context i.e. using Object.defineProperty
import moment from "moment-timezone";
// Override browser default timezone
moment.tz.setDefault('UTC');
// Object,defineProperty("1st argument", "second argument", "3rd argument"): TODO 
Object.defineProperty(Vue.prototype, "$moment", {
  get() {
    return this.$root.moment;
  }
});

// Components
import MovieList from "./components/MovieList.vue";
import MovieFilter from "./components/MovieFilter.vue";

new Vue({
  el: "#app",
  data: {
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment()
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
  },
  created() {
    this.$http.get("/api").then(response => {
      // response.data contains the seeded movie data
      this.movies = response.data;
    });
  }
});
