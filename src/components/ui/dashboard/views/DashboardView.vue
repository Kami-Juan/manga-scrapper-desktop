<template>
  <div>
    <Header />
    <dashboard-list-manga />
  </div>
</template>

<script>
import Header from '../../home/header/organims/Header.vue';
import DashboardListManga from '../organims/DashboardListManga.vue';

export default {
  components: { Header, DashboardListManga },
};
</script>

<style>
</style>
