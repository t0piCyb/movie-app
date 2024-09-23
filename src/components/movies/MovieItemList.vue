<template>
  <li
    class="flex w-full rounded-md hover:bg-slate-100 transition duration-150 ease-out hover:ease-in hover:cursor-pointer"
  >
    <div class="relative">
      <div class="end-0 top-3 absolute">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" @click="toggleFavorite()" class="z-10">
              <StarIcon
                v-if="favorited"
                :fill="'rgb(250,204,21)'"
                class="size-10 text-yellow-400"
              />
              <StarIcon v-else class="size-10" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {{ favorited ? "Remove from favorites" : "Add to favorites" }}
          </TooltipContent>
        </Tooltip>
      </div>
      <div
        class="flex items-center m-4 w-full flex-row gap-4"
        @click="goToMovie()"
      >
        <div>
          <img :src="movie.Poster" alt="poster" class="size-52" />
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-nowrap">
            Title : <span class="font-bold">{{ movie.Title }}</span>
          </p>

          <p>
            Year : <span class="font-bold">{{ movie.Year }}</span>
          </p>
          <div>
            Genre : <span class="font-bold">{{ movie.Genre }}</span>
          </div>
          <div>
            Director : <span class="font-bold">{{ movie.Director }}</span>
          </div>
          <div>
            Actors : <span class="font-bold">{{ movie.Actors }}</span>
          </div>
          <div class="text-pretty">
            Plot : <span class="font-semibold">{{ movie.Plot }}</span>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { StarIcon } from "lucide-vue-next";
import { Movie } from "../../models/movie.schema";
import { useMoviesStore, useMovieStore } from "../../stores/movies.store";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default {
  name: "MovieItemList",
  props: { movie: { type: Object as () => Movie, required: true } },
  setup(props) {
    return props.movie;
  },
  computed: {
    favorited() {
      const store = useMoviesStore();
      return store.favorites.includes(this.movie.imdbID);
    },
  },
  components: {
    Button,
    StarIcon,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  },
  methods: {
    goToMovie() {
      useMovieStore().setMovie(this.movie);
      this.$router.push("/movie");
    },
    toggleFavorite() {
      const store = useMoviesStore();
      store.toggleFavorite(this.movie.imdbID);
    },
  },
};
</script>
