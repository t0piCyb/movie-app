<template>
  <div class="flex flex-col gap-4 justify-center">
    <Card>
      <CardHeader>
        <div class="flex flex-col gap-4">
          <CardTitle>Your movies list</CardTitle>
          <div class="flex flex-row gap-2">
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
            <Toggle
              v-if="store.movies.length > 0"
              @click="filterFavorites()"
              class="flex flex-row gap-2"
            >
              <StarIcon
                :class="
                  cn(store.isFilterFavorites ? 'text-yellow-400' : 'text-black')
                "
              />
              Filter favorites
            </Toggle>
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
import { Loader2, Search, StarIcon, X } from "lucide-vue-next";
import { cn } from "../../lib/utils";
import { useMoviesStore } from "../../stores/movies.store";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Toggle } from "../ui/toggle";
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
    Toggle,
    StarIcon,
  },
  data() {
    return {
      movieFilterName: "",
      store: useMoviesStore(),
      cn: cn,
    };
  },
  computed: {
    movies() {
      return useMoviesStore().filteredMovies;
    },
  },
  methods: {
    filterMovieName() {
      this.store.setFilterTitle(this.movieFilterName);
    },
    filterFavorites() {
      this.store.filterFavorites();
    },
  },
  setup() {
    return {};
  },
};
</script>
