<template>
  <v-row align="center" justify="center" class="access-change-container">
    <v-btn-toggle rounded v-model="toggle_exclusive">
      <v-btn :to="{ name: 'Login' }"> Sign In </v-btn>
      <v-btn :to="{ name: 'Signup' }"> Sign up </v-btn>
    </v-btn-toggle>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      toggle_exclusive: undefined,
    };
  },
};
</script>

<style>
  .access-change-container {
    padding-top: 24px;
  }
</style>
