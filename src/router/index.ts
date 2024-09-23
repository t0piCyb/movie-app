import { createRouter, createWebHistory } from "vue-router";
import MovieListView from "../views/MovieListView.vue";
import MovieView from "../views/MovieView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "movieList",
      component: MovieListView,
    },
    {
      path: "/movie/:imdbID",
      name: "movie",
      component: MovieView,
      props: true,
    },
  ],
});

export default router;
