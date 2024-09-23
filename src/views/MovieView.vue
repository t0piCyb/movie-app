<template>
  <Card>
    <CardHeader>
      <div class="flex flex-row justify-between gap-2 items-center">
        <div class="flex flex-row gap-2">
          <Tooltip>
            <TooltipTrigger>
              <RouterLink to="/"><ArrowLeft /></RouterLink>
            </TooltipTrigger>
            <TooltipContent>
              <p>Back to home</p>
            </TooltipContent>
          </Tooltip>
          <CardTitle>{{ movie.Title }}</CardTitle>
        </div>
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
            <p>
              {{ favorited ? "Remove from favorites" : "Add to favorites" }}
            </p>
          </TooltipContent>
        </Tooltip>
      </div></CardHeader
    >
    <CardContent>
      <div class="flex flex-row gap-4">
        <div class="">
          <img
            :src="movie.Poster"
            class="h-96 w-96 rounded-lg shadow-md"
            alt="poster"
          />
        </div>
        <ScrollArea class="h-96">
          <div class="flex flex-col gap-2">
            <p class="text-xl font-bold">{{ movie.Title }}</p>
            <Separator />
            <p class="text-pretty">
              Year : <span class="font-bold">{{ movie.Year }}</span>
            </p>
            <Separator />
            <p>
              Genre : <span class="font-bold">{{ movie.Genre }}</span>
            </p>
            <Separator />
            <p>
              Director : <span class="font-bold">{{ movie.Director }}</span>
            </p>
            <Separator />
            <p>
              Actors : <span class="font-bold">{{ movie.Actors }}</span>
            </p>
            <Separator />
            <p class="text-pretty">
              Plot : <span class="font-semibold">{{ movie.Plot }}</span>
            </p>
            <Separator />
            <p>
              Rated : <span class="font-bold">{{ movie.Rated }}</span>
            </p>
            <Separator />
            <p>
              Runtime : <span class="font-bold">{{ movie.Runtime }}</span>
            </p>
            <Separator />
            <p>
              Language : <span class="font-bold">{{ movie.Language }}</span>
            </p>
            <Separator />
            <p>
              Country : <span class="font-bold">{{ movie.Country }}</span>
            </p>
            <Separator />
            <p>
              Awards : <span class="font-bold">{{ movie.Awards }}</span>
            </p>
            <Separator />
            <p>
              BoxOffice : <span class="font-bold">{{ movie.BoxOffice }}</span>
            </p>
            <Separator />
            <p>
              Production : <span class="font-bold">{{ movie.Production }}</span>
            </p>
            <Separator />
            <p>
              Website : <span class="font-bold">{{ movie.Website }}</span>
            </p>
            <Separator />
            <p>
              Type : <span class="font-bold">{{ movie.Type }}</span>
            </p>
            <Separator />
            <p>
              Released : <span class="font-bold">{{ movie.Released }}</span>
            </p>
            <Separator />
            <p>
              Metascore : <span class="font-bold">{{ movie.Metascore }}</span>
            </p>
            <Separator />
            <p>
              imdbRating : <span class="font-bold">{{ movie.imdbRating }}</span>
            </p>
            <Separator />
            <p>
              imdbVotes : <span class="font-bold">{{ movie.imdbVotes }}</span>
            </p>
            <Separator />
            <div>
              imdbID : <span class="font-bold">{{ movie.imdbID }}</span>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    :disabled="isCopied"
                    @click="copyId()"
                    variant="ghost"
                    size="xs"
                    class="ml-2"
                    ><Copy v-if="!isCopied" :size="15" />
                    <CopyCheck v-else /><CopyCheck :size="15" v-else
                  /></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy imdbID</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Separator />
            <div class="flex flex-col gap-1">
              Ratings :
              <p class="ml-4" v-for="rate of movie.Ratings">
                {{ rate.Source }} :
                <span class="font-bold">{{ rate.Value }}</span>
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, Copy, CopyCheck, StarIcon } from "lucide-vue-next";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import CardContent from "../components/ui/card/CardContent.vue";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { useMoviesStore, useMovieStore } from "../stores/movies.store";

export default {
  name: "Movie",
  title: "Movie",
  components: {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    ScrollArea,
    Separator,
    Button,
    ArrowLeft,
    Copy,
    CopyCheck,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    StarIcon,
  },
  setup() {
    return {};
  },
  mounted() {
    if (useMovieStore().movie === null) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      movie: useMovieStore().movie,
      isCopied: false,
    };
  },
  computed: {
    favorited() {
      const store = useMoviesStore();
      return store.favorites.includes(this.movie.imdbID);
    },
  },
  methods: {
    toggleFavorite() {
      const store = useMoviesStore();
      store.toggleFavorite(this.movie.imdbID);
    },
    copyId() {
      navigator.clipboard.writeText(this.movie.imdbID);
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 4000);
    },
  },
};
</script>
