<template>
  <div v-if="!loading">
    <dashboard-list-manga-header v-if="listMangas.length > 0" @onHandlerAddNewList="openModal"/>
    <div class="py-4 px-4">
      <h1 class="pb-4">Your Lists</h1>
      <v-row v-if="listMangas.length > 0">
        <v-col md="4" lg="3" xl="2" v-for="item in listMangas" :key="item.id">
          <dashboard-list-manga-card v-bind="item"/>
        </v-col>
      </v-row>
      <dashboard-list-manga-empty v-else @onAddList="openModal"/>
      <dashboad-list-manga-add-list-modal v-model="addListModal" @onAddNewList="onAddNewList"/>
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
import DashboardListMangaCard from '../molecules/DashboardListMangaCard.vue';
import DashboardListMangaEmpty from '../molecules/DashboardListMangaEmpty.vue';
import DashboadListMangaAddListModal from '../molecules/DashboadListMangaAddListModal.vue';
import DashboardListMangaHeader from '../molecules/DashboardListMangaHeader.vue';
import ListMangaRepository from '../../../../repository/ListMangaRepository';

export default {
  components: {
    DashboardListMangaCard,
    DashboardListMangaEmpty,
    DashboadListMangaAddListModal,
    DashboardListMangaHeader,
  },
  data() {
    return {
      listMangas: [],
      addListModal: false,
      loading: false,
    };
  },
  methods: {
    openModal() {
      this.addListModal = !this.addListModal;
    },
    async getAllListMangas() {
      try {
        this.loading = true;
        const { data } = await ListMangaRepository.getAllListMangas();
        this.listMangas = data.lists;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    onAddNewList(list) {
      this.listMangas = [
        ...this.listMangas,
        list,
      ];
    },
  },
  created() {
    this.getAllListMangas();
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
