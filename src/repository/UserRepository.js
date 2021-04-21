import Repository from './repository';

export default {
  onSignIn(request) {
    return Repository.post(`${process.env.VUE_APP_BACKEND_URL}/users/login`, request);
  },
  onLogout() {
    return Repository.get(`${process.env.VUE_APP_BACKEND_URL}/users/logout`, { withCredentials: true });
  },
};
