import Repository from './repository';

export default {
  getAllListMangas() {
    return Repository.get(`${process.env.VUE_APP_BACKEND_URL}/list-manga`);
  },
  getMangasByList(idList) {
    return Repository.get(`${process.env.VUE_APP_BACKEND_URL}/list-manga/${idList}/mangas`);
  },
};
