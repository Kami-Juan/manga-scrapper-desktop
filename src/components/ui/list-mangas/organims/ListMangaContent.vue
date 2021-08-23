<template>
  <div v-if="!loading">
    <list-manga-header @onAddManga="onAddManga" v-if="mangas.length > 0"/>
    <div class="py-4 px-4">
      <h1 class="pb-4">Your Mangas</h1>
      <v-row v-if="mangas.length > 0">
        <v-col md="4" lg="3" xl="2" v-for="item in mangas" :key="item.id">
          <list-manga-card v-bind="item"/>
        </v-col>
      </v-row>
      <list-manga-empty @onAddManga="onAddManga" v-else />
      <list-manga-add-manga-modal v-model="openAddMangaModal" @onNewManga="onNewManga"/>
    </div>
  </div>
  <div class="loading mt-4" v-else>
    <v-progress-circular
      :size="50"
      :width="5"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import ListMangaRepository from '../../../../repository/ListMangaRepository';
import ListMangaAddMangaModal from './ListMangaAddMangaModal.vue';
import ListMangaCard from './ListMangaCard.vue';
import ListMangaEmpty from './ListMangaEmpty.vue';
import ListMangaHeader from './ListMangaHeader.vue';

export default {
  components: {
    ListMangaCard, ListMangaHeader, ListMangaAddMangaModal, ListMangaEmpty,
  },
  data() {
    return {
      mangas: [],
      openAddMangaModal: false,
      loading: true,
    };
  },
  methods: {
    async onViewMangas() {
      try {
        this.loading = true;

        const { data } = await ListMangaRepository.getMangasByList(this.$route.params.idList);
        this.mangas = data.mangas;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    onAddManga() {
      this.openAddMangaModal = !this.openAddMangaModal;
    },
    onNewManga(manga) {
      this.mangas = [
        ...this.mangas,
        manga,
      ];
    },
  },
  created() {
    this.onViewMangas();
  },
};
</script>

<style>
  .loading {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
