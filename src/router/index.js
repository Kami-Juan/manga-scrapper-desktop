import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '../components/ui/dashboard/views/DashboardView.vue';
import { auth } from '../middleware/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      auth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      auth: false,
    },
    component: () => import(/* webpackChunkName: "login" */ '../components/ui/access/views/AccessView.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: {
      auth: false,
    },
    component: () => import(/* webpackChunkName: "login" */ '../components/ui/access/views/AccessView.vue'),
  },
  {
    path: '/:idList/mangas',
    name: 'ListManga',
    meta: {
      auth: true,
    },
    component: () => import(/* webpackChunkName: "login" */ '../components/ui/list-mangas/views/ListMangaView.vue'),
  },
  {
    path: '/:idManga/chapters',
    name: 'ChaptersManga',
    meta: {
      auth: true,
    },
    component: () => import(/* webpackChunkName: "login" */ '../components/ui/manga/views/MangaView.vue'),
  },
  {
    path: '/chapter',
    name: 'ChapterManga',
    meta: {
      auth: true,
    },
    component: () => import(/* webpackChunkName: "login" */ '../components/ui/chapter/views/ChapterView.vue'),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const authenticate = auth({ next, to });

  if (to.meta.auth) {
    if (authenticate) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else if (to.name === 'Login' && authenticate) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;
