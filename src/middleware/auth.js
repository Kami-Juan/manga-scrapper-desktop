import jwtDecode from 'jwt-decode';

import store from '../store';

const auth = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  try {
    const values = jwtDecode(token);

    store.commit('auth/SET_USER_CREDENTIALS', values);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export { auth };
