<template>
  <v-app-bar app color="primary" dark>

    <v-spacer></v-spacer>

    <v-btn icon @click="onLogout">
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import UserRepository from '../../../../../repository/UserRepository';

export default {
  name: 'Header',
  methods: {
    async onLogout() {
      try {
        await UserRepository.onLogout();
        localStorage.clear();
        this.$router.push({ name: 'Login' });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
