<template>
  <v-container class="container">
    <h2>Sorry, you don't have any mangas uploaded, try to add one 🦄</h2>
    <v-btn class="mt-4" color="secondary" @click="onAddManga">
      Add Manga
    </v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    onAddManga() {
      this.$emit('onAddManga');
    },
  },
};
</script>

<style>
  .container {
    text-align: center;
    height: 100%;
  }
</style>
