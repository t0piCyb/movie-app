import { defineStore } from "pinia";
import { API_KEY } from "../lib/env";
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

export const useMoviesStore = defineStore({
  id: "movies",
  state: () => ({
    movies: [] as Movie[],
  }),
  actions: {
    setMovies(movies: Movie[]) {
      this.movies = movies;
    },
    async getMovieByID(id: string) {
      console.log("we fetch id", id);
      const response = await fetch(
        `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      );
      const data = await response.json();
      this.movies = data.results;
    },
    async getMovies() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=the+matrix`
      );
      const data = await response.json();
      this.movies = data.results;
    },
    async getMoviePoster(id: string) {
      const response = await fetch(
        `http://img.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`
      );
      const data = await response.json();
      return data.Poster;
    },
  },
});
