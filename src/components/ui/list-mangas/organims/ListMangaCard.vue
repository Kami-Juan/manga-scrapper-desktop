<template>
  <v-card>
    <v-img :src="image_url" :lazy-src="image_url"></v-img>
    <v-card-title class="truncated-text">{{ title }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="scoreManga"
          color="amber"
          dense
          length="10"
          half-increments
          readonly
          size="14"
        ></v-rating>
      </v-row>

      <div class="my-4 subtitle-1">
        {{ booktype }}
      </div>
      <div class="my-4 subtitle-1">
        {{ demography }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="onViewChapters">
        Ver Capítulos
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    score: {
      type: String,
      required: true,
    },
    booktype: {
      type: String,
      required: true,
    },
    demography: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  computed: {
    scoreManga() {
      return parseFloat(this.score);
    },
  },
  methods: {
    onViewChapters() {
      this.$router.push({ name: 'ChaptersManga', params: { idManga: this.id } });
    },
  },
};
</script>

<style>
  .truncated-text {
    overflow:hidden;
    width: 100%;
    display: inline-block;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
</style>
