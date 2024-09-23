<template>
  <header
    class="w-full fixed bg-primary z-50 h-20 flex justify-center items-center"
  >
    <img src="/icon.svg" class="h-20 w-20" alt="logo" />

    <h1 class="text-4xl font-bold text-primary-foreground">Movie App</h1>
  </header>
  <div class="flex flex-col gap-4 p-8">
    <TooltipProvider>
      <div class="flex-grow mt-14">
        <RouterView />
      </div>
    </TooltipProvider>
  </div>
</template>

<script lang="ts">
import { RouterView } from "vue-router";
import { TooltipProvider } from "./components/ui/tooltip";

export default {
  name: "App",
  title: "App",
  components: {
    RouterView,
    TooltipProvider,
  },
  setup() {
    return {};
  },
};
</script>
