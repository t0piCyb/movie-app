<template>
  <MovieDetailed :imdbID="imdbID" />
</template>

<script lang="ts">
import { Suspense } from "vue";

import MovieDetailed from "../components/movies/MovieDetailed.vue";
import { Skeleton } from "../components/ui/skeleton";

export default {
  name: "Movie",
  title: "Movie",
  components: {
    MovieDetailed,
    Suspense,
    Skeleton,
  },
  props: {
    imdbID: {
      type: String,
      required: true,
    },
  },
};
</script>
