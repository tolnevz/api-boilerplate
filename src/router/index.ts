import { createRouter, createWebHistory } from 'vue-router';
import useStore from '@/stores/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: () => import('../pages/LoginPage.vue'),
    },
    {
      path: '/home',
      name: 'HomePage',
      component: () => import('../pages/HomePage.vue'),
    },
    {
      path: '/:id',
      name: 'TemplateItem',
      component: () => import('../pages/TemplateItem.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('../pages/LoginPage.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const store = useStore();
  store.checkIsAuthenticated();

  if (to.name !== 'LoginPage' && !localStorage.getItem('token')) {
    next({ name: 'LoginPage' });
  } else {
    next();
  }
});

export default router;
