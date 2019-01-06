<template>
  <div class="movie">
    <div class="movie-col-left"></div>
    <img v-bind:src="movie.Poster" v-bind:alt="movie.Title">
    <div class="movie-col-right">
      <div class="movie-title">
        <h2>{{ movie.Title }}</h2>
        <span class="movie-rating">{{ movie.Rated }}</span>
      </div>
      <div class="movie-sessions">
        <div class="session-time-wrapper" v-for="session in filteredSessions(sessions)">
          <div class="session-time">{{ formatSessionTime(session.time) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movie", "sessions", "day"],
  methods: {
    formatSessionTime(rawTime) {
      return this.$moment(rawTime).format("h:mm A");
    },
    filteredSessions(sessions) {
      // return Boolean depending on whether session specified matches today's time from moment
      // Array#filter(callback)
      return sessions.filter(session => {
        return this.$moment(session.time).isSame(this.day, "day");
      });
    }
  }
};
</script>