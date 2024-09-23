<template>
  <div class="flex flex-col gap-4 p-8">
    <h1 class="text-4xl font-bold">Movie App</h1>
    <RouterView />
  </div>
</template>

<script lang="ts">
import { RouterView } from "vue-router";

export default {
  name: "App",
  title: "App",
  components: {
    RouterView,
  },
  setup() {
    return {};
  },
};
</script>
