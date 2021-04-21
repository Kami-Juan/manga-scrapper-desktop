import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API}`,
});

const TOKEN = localStorage.getItem('token') ? localStorage.getItem('token').toString() : null;

const BEARER_TOKEN = `Bearer ${TOKEN}`;

// https://github.com/axios/axios#interceptors
instance.interceptors.request.use((config) => ({
  ...config,
  headers: { ...config.headers, Authorization: BEARER_TOKEN, 'Access-Control-Allow-Origin': '*' },
  withCredentials: true,
}));

// https://github.com/axios/axios#interceptors
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err.response);

    if (err.response) {
      const { status } = err.response;

      switch (status) {
        case 401: {
          fetch(`${process.env.VUE_APP_BACKEND_URL}/users/logout`, {
            credentials: 'include',
          })
            .then(() => {
              localStorage.clear();
              window.location.reload();
            });
          break;
        }
        default:
          break;
      }
    }

    return Promise.reject(err);
  },
);

export default instance;
