<template>
  <v-app-bar
    color="transparent"
    elevation="0"
    dark
  >
    <div class="tools">
      <v-row align="center">
        <v-spacer></v-spacer>
        <v-col>
          <v-row justify="center">
            <v-btn color="primary" @click="onAddManga">
              Add new manga
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-spacer></v-spacer>
    <v-btn icon color="secondary">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>
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
