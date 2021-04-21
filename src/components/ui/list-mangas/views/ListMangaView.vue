<template>
  <div class="py-4 px-4">
    <h2 class="pb-4 text-uppercase">Tu lista de mangas</h2>
    <v-row>
      <v-col md="4" lg="3" xl="2" v-for="item in mangas" :key="item.id">
        <list-manga-card v-bind="item"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ListMangaRepository from '../../../../repository/ListMangaRepository';
import ListMangaCard from '../organims/ListMangaCard.vue';

export default {
  components: { ListMangaCard },
  data() {
    return {
      mangas: [],
    };
  },
  methods: {
    async onViewMangas() {
      try {
        const { data } = await ListMangaRepository.getMangasByList(this.$route.params.idList);
        this.mangas = data.mangas;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.onViewMangas();
  },
};
</script>

<style>

</style>
