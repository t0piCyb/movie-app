<template>
  <li class="flex w-full rounded-md hover:bg-slate-100">
    <div class="flex items-center m-2 w-full flex-row gap-4">
      <div>
        <img :src="movie.Poster" alt="poster" />
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
  </li>
</template>

<script lang="ts">
import { Movie } from "../../models/movie.schema";

export default {
  name: "MovieItemList",
  props: { movie: { type: Object as () => Movie, required: true } },
  setup(props) {
    return props.movie;
  },
};
</script>
