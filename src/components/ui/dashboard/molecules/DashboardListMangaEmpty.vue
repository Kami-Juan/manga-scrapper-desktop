<template>
  <v-container class="container">
    <h2>Sorry, you don't have any list yet, try to add one 🦄</h2>
    <v-btn class="mt-4" color="secondary" @click="onAddList">
      Add New List
    </v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    onAddList() {
      this.$emit('onAddList');
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
