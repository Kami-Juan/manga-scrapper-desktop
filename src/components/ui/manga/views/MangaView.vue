<template>
  <v-container>
    <v-row class="flex-column">
      <v-col md="12" class="mb-4">
        <v-row>
          <v-col md="3">
            <v-row class="flex-column" dense>
              <v-col cols="12">
                <v-img
                  :src="manga.image_url"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col md="7">
            <v-row class="flex-column mt-1 ml-2">
              <h2>{{ manga.title }}</h2>
              <h3>Descripción</h3>
              <span class="text-justify mb-2">{{ manga.description }}</span>
              <h3>Score</h3>
              <div class="d-flex">
                <v-rating
                  :value="parseInt(manga.score)"
                  color="amber"
                  class="mb-2"
                  dense
                  length="10"
                  half-increments
                  readonly
                  size="14"
                />
                <span class="mr-2 font-weight-bold">({{ manga.score }})</span>
              </div>
              <h3>Status</h3>
              <span class="text-justify mb-2">{{ manga.status }}</span>
              <h3>Año de publicación</h3>
              <span class="text-justify mb-2 ">{{ manga.years }}</span>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-divider></v-divider>
      <v-col md="3" class="mt-4">
        <v-text-field
          label="Buscar capítulo"
          outlined
          dense
          prepend-inner-icon="mdi-magnify"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <div class="d-flex align-center pb-2 container-header">
          <h1 class="font-weight-regular grey--text lighten-2">Capítulos</h1>
          <v-spacer></v-spacer>
          <div class="mr-4">
            <v-checkbox label="Modo edición"></v-checkbox>
          </div>
          <div class="mr-4">
            <v-checkbox label="Ver no vistos"></v-checkbox>
          </div>
          <div class="mr-4">
            <v-checkbox label="Ver favoritos"></v-checkbox>
          </div>
          <v-divider vertical></v-divider>
          <div style="max-width: 160px" class="mx-4">
            <v-select
              :items="['Capitulo', 'Fecha']"
              dense
              hide-details
              :prepend-icon="
                ui.order ? 'mdi-sort-ascending' : 'mdi-sort-descending'
              "
              @click:prepend="onChangeOrder"
              v-model="ui.orderBy"
            />
          </div>
          <v-btn
            icon
            :color="ui.viewMode === 'comfy' ? 'primary' : ''"
            @click="onChangeView('comfy')"
          >
            <v-icon> mdi-view-comfy </v-icon>
          </v-btn>
          <v-btn
            icon
            :color="ui.viewMode === 'headline' ? 'primary' : ''"
            @click="onChangeView('headline')"
          >
            <v-icon> mdi-view-headline </v-icon>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <div class="px-2">
          <div v-for="(chapter, i) in chapters" :key="i">
            <v-row align="center" class="py-6">
              <div class="mr-4">
                <v-btn icon>
                  <v-icon> mdi-eye </v-icon>
                </v-btn>
              </div>
              <v-col class="mr-6" style="width: 220px">
                <span class="three-dots d-inline-block" style="width: 100%">
                  {{ chapter.title }}
                </span>
              </v-col>
              <div class="mr-6" style="width: 380px">
                <span class="three-dots d-inline-block" style="width: 100%">
                  <span class="font-weight-bold">De:</span>
                  {{ chapter.fansub_title }}
                </span>
              </div>
              <div class="mr-4" style="width: 120px">
                <span>{{ chapter.publish_date }}</span>
              </div>
              <v-spacer></v-spacer>
              <div class="mr-4">
                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark icon v-bind="attrs" v-on="on" color="red">
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-list-item-title>Descargar capítulo</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="onViewChapter(chapter.url)">
                      <v-list-item-title>Ver capítulo</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-row>
            <v-divider></v-divider>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ipcRenderer } from 'electron';

import { formatDate } from '../../../../utils';

import ChapterRepository from '../../../../repository/ChapterRepository';

export default {
  data() {
    return {
      ui: {
        order: false,
        orderBy: 'Capitulo',
        viewMode: 'headline',
      },
      chapters: [],
      manga: {},
    };
  },
  methods: {
    onChangeView(view) {
      this.ui.viewMode = view;
    },
    onChangeOrder() {
      this.ui.order = !this.ui.order;
    },
    async onViewChapters() {
      try {
        const { data } = await ChapterRepository.getAllMangaChapters(
          this.$route.params.idManga,
        );

        this.chapters = data.chapters.map((ch) => ({
          ...ch,
          publish_date: formatDate(ch.publish_date),
        }));

        this.manga = data.manga;

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    onViewChapter(link) {
      // this.$router.push({ name: 'ChapterManga', params: { url: link } });
      ipcRenderer.send('show-chapter', link);
    },
  },
  created() {
    this.onViewChapters();
  },
};
</script>

<style>
.three-dots {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.container-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
}
</style>
