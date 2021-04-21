import { SET_USER_CREDENTIALS } from './mutations-types';

const mutations = {
  [SET_USER_CREDENTIALS](state, payload) {
    const { userId, email, exp } = payload;

    state.user = {
      id: userId,
      email,
      exp: new Date(exp * 1000),
    };
  },
};

export { mutations };
