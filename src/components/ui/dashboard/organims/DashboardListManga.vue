<template>
  <div class="py-4 px-4">
    <h2 class="pb-4 text-uppercase">Tu lista de mangas</h2>
    <v-row>
      <v-col md="4" lg="3" xl="2" v-for="item in listMangas" :key="item.id">
        <dashboard-list-manga-card v-bind="item"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DashboardListMangaCard from '../molecules/DashboardListMangaCard.vue';
import ListMangaRepository from '../../../../repository/ListMangaRepository';

export default {
  components: { DashboardListMangaCard },
  data() {
    return {
      listMangas: [],
    };
  },
  methods: {
    async getAllListMangas() {
      try {
        const { data } = await ListMangaRepository.getAllListMangas();
        this.listMangas = data.lists;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getAllListMangas();
  },
};
</script>

<style>
</style>
