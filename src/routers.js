import { createRouter, createWebHistory } from 'vue-router';
import RideDetail from './pages/rides/RideDetail.vue';
import RidesList from './pages/rides/RidesList.vue';
import AddRides from './pages/rides/AddRides.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import ReserveRide from './pages/requests/ReserveRide.vue';
import NotFound from './pages/NotFound.vue';

import Auth from './pages/auth/UserAuth.vue';

import Temp from './pages/rides/Temp.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/rides' },
    { path: '/rides', component: RidesList, name: 'Ana Sayfa' },
    {
      path: '/rides/:id',
      component: RideDetail,
      name: 'Sefer Detay',
      props: true,
      children: [
        { path: '/reserve', component: ReserveRide } // /rides/r1/reserve
      ]
    },
    { path: '/add-ride', component: AddRides, meta: { requiresAuth: true}, name: 'Sefer Ekle' },
    { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true}, name: 'Rezervasyonlar' },
    { path: '/:notFound(.*)', component: NotFound },
    { path: '/giris', component: Temp },

    {path: '/auth', component: Auth, meta: { requiresUnauth: true}, name: 'Giriş' },
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/rides');
  } else {
    next();
  }
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`
});

export default router;
