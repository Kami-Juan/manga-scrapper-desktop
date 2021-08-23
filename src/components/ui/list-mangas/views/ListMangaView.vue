<template>
  <div>
    <Header />
    <list-manga-content />
  </div>
</template>

<script>
import Header from '../../home/header/organims/Header.vue';
import ListMangaContent from '../organims/ListMangaContent.vue';

export default {
  components: { Header, ListMangaContent },
};
</script>

<style>

</style>
