<template>
  <Card>
    <CardHeader>
      <div class="flex flex-row gap-2">
        <RouterLink to="/"><ArrowLeft /></RouterLink>
        <CardTitle>{{ movie.Title }}</CardTitle>
      </div></CardHeader
    >
    <CardContent>
      <div class="flex flex-row gap-4">
        <div>
          <img :src="movie.Poster" class="h-96 w-96" alt="poster" />
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
              <Button
                :disabled="isCopied"
                @click="copyId()"
                variant="ghost"
                size="xs"
                class="ml-2"
                ><Copy v-if="!isCopied" :size="15" />
                <CopyCheck v-else /><CopyCheck :size="15" v-else
              /></Button>
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
import { ArrowLeft, Copy, CopyCheck } from "lucide-vue-next";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import CardContent from "../components/ui/card/CardContent.vue";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { useMovieStore } from "../stores/movies.store";

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
  methods: {
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
