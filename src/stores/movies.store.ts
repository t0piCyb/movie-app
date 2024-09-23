import { defineStore } from "pinia";
import { Movie } from "../models/movie.schema";

export const useMovieStore = defineStore({
  id: "movie",
  state: () => ({
    movie: {} as Movie,
  }),
  actions: {
    setMovie(movie: Movie) {
      this.movie = movie;
    },
  },
});

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    movies: [] as Movie[],
    filteredMovies: [] as Movie[],
    filterTitle: "",
  }),
  actions: {
    setMovies(movies: Movie[]) {
      this.movies = movies;
      this.setFilteredMovies(movies);
    },

    setFilteredMovies(movies: Movie[]) {
      this.filteredMovies = movies;
    },
    setFilterTitle(title: string) {
      this.filterTitle = title;
      if (title === "") {
        this.setFilteredMovies(this.movies);
        return;
      }
      this.setFilteredMovies(
        this.movies.filter((m) =>
          m.Title.toLowerCase().includes(title.toLowerCase())
        )
      );
    },
    addMovie(movie: Movie) {
      if (this.movies.find((m) => m.imdbID === movie.imdbID)) {
        return;
      }
      this.movies.push(movie);
      this.setFilteredMovies(this.movies);
    },
    resetMovies() {
      this.movies = [];
      this.filteredMovies = [];
    },
  },
});
