import { defineStore } from "pinia";
import { Movie } from "../models/movie.schema";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    movies: [] as Movie[],
    filteredMovies: [] as Movie[],
    filterTitle: "",
    favorites: [] as string[],
    isFilterFavorites: false,

    imdbIDSearched: "",
  }),
  actions: {
    setImdbIDSearched(imdbID: string) {
      this.imdbIDSearched = imdbID;
    },
    setMovies(movies: Movie[]) {
      this.movies = movies;
      this.setFilteredMovies(movies);
    },
    setFavorites(favorites: string[]) {
      this.favorites = favorites;
    },
    addFavorite(imdbID: string) {
      if (this.favorites.includes(imdbID)) {
        return;
      }
      this.favorites.push(imdbID);
    },

    toggleFavorite(imdbID: string) {
      this.favorites.includes(imdbID)
        ? this.removeFavorite(imdbID)
        : this.addFavorite(imdbID);
    },
    removeFavorite(imdbID: string) {
      this.favorites = this.favorites.filter((id) => id !== imdbID);
    },
    resetFavorites() {
      this.favorites = [];
    },
    filterFavorites() {
      this.isFilterFavorites = !this.isFilterFavorites;
      if (this.isFilterFavorites)
        this.setFilteredMovies(
          this.filteredMovies.filter((m) => this.favorites.includes(m.imdbID))
        );
      else {
        this.setFilterTitle(this.filterTitle);
      }
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
