<template>
    <div class="movie">
        <div class="movie-col-left"></div>
            <img v-bind:src="movie.Poster" v-bind:alt="movie.Title">
        <div class="movie-col-right">
            <div class="movie-title">
                <h2>{{ movie.Title }}</h2>
                <span class="movie-rating">{{ movie.Rated }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['movie']
}
</script>