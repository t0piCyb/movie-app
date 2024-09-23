<template>
  <div class="flex flex-col gap-4 justify-center">
    <Card>
      <CardHeader>
        <div class="flex flex-col gap-4">
          <CardTitle>Your Movie List</CardTitle>

          <div
            v-if="store.movies.length > 1"
            class="relative w-full max-w-sm items-center"
          >
            <Input
              type="text"
              v-model="movieFilterName"
              placeholder="Filter movies by title"
              @keyup.enter="filterMovieName()"
              @update:model-value="filterMovieName()"
              class="pr-10"
            />
            <Button
              v-if="movieFilterName !== ''"
              @click="(movieFilterName = ''), filterMovieName()"
              variant="ghost"
              class="absolute right-0 inset-y-0 flex items-center justify-center px-2"
            >
              <X class="size-6" />
            </Button>
          </div>
        </div>
      </CardHeader>
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
import { Loader2, Search, X } from "lucide-vue-next";
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
    Search,
    Loader2,
    X,
  },
  data() {
    return {
      movieFilterName: "",
      store: useMoviesStore(),
    };
  },
  computed: {
    movies() {
      return useMoviesStore().filteredMovies;
    },
  },
  methods: {
    filterMovieName() {
      const store = useMoviesStore();
      store.setFilterTitle(this.movieFilterName);
    },
  },
  setup() {
    return {};
  },
};
</script>
