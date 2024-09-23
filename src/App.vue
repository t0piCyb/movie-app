<template>
  <div class="flex flex-col gap-4 p-8">
    <div class="flex flex-row gap-4">
      <div class="flex flex-row gap-2">
        <Input v-model="movieName" placeholder="Search movie by name"></Input>
        <Button
          v-if="!isLoadingName"
          :variant="'ghost'"
          @click="getMovieName(movieId)"
          ><Search
        /></Button>
        <div v-else class="flex justify-center items-center">
          <Loader2 class="animate-spin"></Loader2>
        </div>
      </div>
      <div class="flex flex-row gap-2">
        <Input v-model="movieId" placeholder="Search movie by id"></Input>
        <Button
          v-if="!isLoadingId"
          :variant="'ghost'"
          @click="getMovieID(movieId)"
          ><Search
        /></Button>
        <div v-else class="flex justify-center items-center">
          <Loader2 class="animate-spin"></Loader2>
        </div>
      </div>
    </div>
    <Card
      v-if="error"
      class="border-2 rounded-md p-2 bg-red-200 border-red-300 hover:text-slate-600 hover:bg-slate-300 focus:ring-4 focus:ring-red-300"
    >
      <p>Error: {{ error }}</p>
    </Card>
    <MoviesList :movies="movies"></MoviesList>
  </div>
</template>

<script lang="ts">
import { Loader2, Search } from "lucide-vue-next";
import MoviesList from "./components/movies/MoviesList.vue";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { API_KEY } from "./lib/env";
import { Movie } from "./models/movie.schema";
import { useMoviesStore } from "./stores/movies.store";

export default {
  name: "App",
  title: "App",
  components: {
    MoviesList,
    Input,
    Button,
    Search,
    Loader2,
    Card,
  },
  setup() {
    return {};
  },
  data() {
    return {
      isLoadingName: false,
      isLoadingId: false,
      error: null,
      movieId: "",
      movieName: "",
      movies: [] as Movie[],
    };
  },
  methods: {
    async getMovieID(id: string) {
      if (id === "") {
        return;
      }
      this.movieId = id;
      this.isLoadingId = true;
      const response = await fetch(
        `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      );
      const data = await response.json();

      this.isLoadingId = false;
      if (response.status !== 200) {
        this.error = data;
        setTimeout(() => {
          this.error = null;
        }, 3000);
        return;
      }
      if (data.Response === "False") {
        this.error = data.Error;
        setTimeout(() => {
          this.error = null;
        }, 3000);
        return;
      }

      const movies = data as Movie[];
      console.log("movies", movies);
      useMoviesStore().setMovies(movies);
    },
    async getMovieName(name: string) {
      if (name === "") {
        return;
      }
      this.movieName = name;
      this.isLoadingName = true;
      const response = await fetch(
        `http://www.omdbapi.com/?i=${name}&apikey=${API_KEY}`
      );
      const data = await response.json();
      this.isLoadingName = false;
      if (response.status !== 200) {
        this.error = data;
        setTimeout(() => {
          this.error = null;
        }, 3000);
        return;
      }
      if (data.Response === "False") {
        this.error = data.Error;
        setTimeout(() => {
          this.error = null;
        }, 3000);
        return;
      }

      useMoviesStore().setMovies([data as Movie]);
    },
  },
};
</script>
