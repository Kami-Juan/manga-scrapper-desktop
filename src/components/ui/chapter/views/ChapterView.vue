<template>
  <div>
    <chapter-header />
    <v-sheet class="overflow-y-auto">
      <v-container style="height: calc(100vh - 128px);" >
        <v-row justify="center" no-gutters v-if="!loading">
          <v-col v-for="img in images" :key="img" cols="8" >
            <v-img
              :lazy-src="img"
              :src="img"
            ></v-img>
          </v-col>
        </v-row>
        <div class="loading mt-4" v-else>
          <v-progress-circular
            :size="50"
            :width="5"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-container>
     </v-sheet>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';

import ChapterRepository from '../../../../repository/ChapterRepository';

import ChapterHeader from '../organims/ChapterHeader.vue';

export default {
  components: { ChapterHeader },
  data() {
    return {
      images: [],
      loading: true,
    };
  },
  methods: {
    async onViewChapter(link) {
      try {
        this.loading = true;

        const { data } = await ChapterRepository.getMangaChapter(link);

        this.images = data.images;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    getData() {
      ipcRenderer.on('data', (e, link) => {
        this.onViewChapter(link);
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
  .chapter-container {
    overflow: hidden;
  }

  .overflow-y-auto {
    margin-top: 128px;
  }

  html {
    overflow-y: hidden;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
