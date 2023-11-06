import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import UserView from '@/views/UserView.vue';
import AccountView from '@/views/AccountView.vue';
import UpdateProfile from '@/views/account/UpdateProfile.vue';
import UserOrders from '@/views/account/UserOrders.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
  },
  {
    path: '/account/:id',
    name: 'account',
    component: AccountView,
    children: [
      {
        path: 'update',
        component: UpdateProfile,
      },
      {
        path: 'orders',
        component: UserOrders,
      },
    ],
  },
  {
    path: '/:pathName(.*)*',
    name: 'NoFound',
    component: NotFound,
  },
];

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(process.env.API_URL),
  routes,
});

export default router;
