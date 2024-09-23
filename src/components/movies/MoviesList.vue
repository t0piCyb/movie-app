<template>
  <div class="flex flex-col gap-4 justify-center">
    <Card>
      <CardHeader> <CardTitle>Your Movie List</CardTitle></CardHeader>
      <CardContent>
        <p v-if="!movies || movies.length === 0" class="italic">No movies</p>
        <ul v-else class="flex flex-col gap-4 w-full">
          <MovieItemList
            v-for="movie in movies"
            :key="movie.Title"
            :movie="movie"
          >
          </MovieItemList>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts">
import { useMoviesStore } from "../../stores/movies.store";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import MovieItemList from "./MovieItemList.vue";

export default {
  name: "MoviesList",
  components: {
    MovieItemList,
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    Input,
    Button,
  },
  computed: {
    movies() {
      return useMoviesStore().movies;
    },
  },
  setup() {
    return {};
  },
};
</script>
