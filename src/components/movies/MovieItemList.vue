<template>
  <li class="flex w-full rounded-md hover:bg-slate-100">
    <div class="flex items-center m-2 w-full">
      <p>{{ movie.Title }}</p>
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
