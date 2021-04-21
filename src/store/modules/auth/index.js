import { mutations } from './mutations';
import { state } from './state';

const auth = {
  namespaced: true,
  mutations,
  state,
};

export {
  auth,
};
