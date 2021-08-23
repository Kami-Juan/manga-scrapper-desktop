import Repository from './repository';

export default {
  getAllMangaChapters(mangaId) {
    return Repository.get(`${process.env.VUE_APP_BACKEND_URL}/chapters/${mangaId}/chapters`);
  },
  getMangaChapter(url) {
    return Repository.post(`${process.env.VUE_APP_BACKEND_URL}/chapters`, { url });
  },
};
