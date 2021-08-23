import Repository from './repository';

export default {
  storeManga(req) {
    return Repository.post(`${process.env.VUE_APP_BACKEND_URL}/mangas`, req);
  },
};
