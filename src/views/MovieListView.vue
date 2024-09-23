<template>
  <div class="flex flex-col gap-4 p-8">
    <div class="flex flex-row gap-4">
      <div class="flex flex-row gap-2 w-full justify-between">
        <Input
          v-model="movieId"
          @keyup.enter="getMovieID(movieId)"
          placeholder="Search movies by imdbID (separate by commas if you want to search multiple movies)"
        ></Input>
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
import MoviesList from "../components/movies/MoviesList.vue";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { API_KEY } from "../lib/env";
import { Movie } from "../models/movie.schema";
import { useMoviesStore } from "../stores/movies.store";

export default {
  name: "MovieListView",
  title: "MovieListView",
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
      movieId: useMoviesStore().imdbIDSearched ?? "",
      movies: [] as Movie[],
    };
  },
  methods: {
    async getMovieID(id: string) {
      if (id === "") {
        return;
      }
      const store = useMoviesStore();
      this.movieId = id;
      store.setImdbIDSearched(id);
      this.isLoadingId = true;

      store.resetMovies();

      const listId = id.split(",");
      listId.map(async (id) => {
        if (id !== "") {
          const response = await fetch(
            `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
          );
          const data = await response.json();

          if (response.status !== 200 && !this.error) {
            this.error = data;
            setTimeout(() => {
              this.error = null;
            }, 3000);
            return;
          }
          if (data.Response === "False" && !this.error) {
            this.error = data.Error;
            setTimeout(() => {
              this.error = null;
            }, 3000);
            return;
          }

          const movie = data as Movie;
          store.addMovie(movie);
        }
      });
      this.isLoadingId = false;
    },
  },
};
</script>
