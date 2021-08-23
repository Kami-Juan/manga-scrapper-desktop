<template>
  <v-card>
    <v-img
      :src="image"
      :lazy-src="image"
      height="250px"
      position="center"
    ></v-img>
    <v-card-title>{{title}}</v-card-title>

    <v-card-text>
      <div>
        {{formatDescription ? formatDescription : 'Sin descripción :3' }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-chip-group
        column
      >
        <v-chip>
          <v-icon left>
            {{ visibilily ? 'mdi-eye' : 'mdi-eye-off' }}
          </v-icon>
          {{ visibilily ? 'Público' : 'Privada' }}
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="onViewMangas">
        Ver más
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import randomanime from 'random-anime';

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
    description: {
      type: String,
      required: true,
    },
    visibilily: {
      type: Boolean,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  computed: {
    image() {
      return this.image_url ? this.image_url : randomanime.anime();
    },
    formatDescription() {
      return this.description.replace(/\n+/g, '');
    },
  },
  methods: {
    onViewMangas() {
      this.$router.push({ params: { idList: this.id }, name: 'ListManga' });
    },
  },
};
</script>

<style>
</style>
