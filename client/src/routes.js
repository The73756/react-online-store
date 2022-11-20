import Auth from './pages/Auth';
import Basket from './pages/Basket';
import DevicePage from './pages/DevicePage';
import Shop from './pages/Shop';
import RatedDevices from './pages/RatedDevices';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  RATING_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from './utils/consts';
import Admin from './pages/Admin';

export const authRoutes = [
  {
    path: BASKET_ROUTE,
    component: Basket,
  },

  {
    path: RATING_ROUTE,
    component: RatedDevices,
  },
];

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    component: Admin,
  },
  {
    path: BASKET_ROUTE,
    component: Basket,
  },

  {
    path: RATING_ROUTE,
    component: RatedDevices,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    component: Shop,
  },

  {
    path: LOGIN_ROUTE,
    component: Auth,
  },

  {
    path: REGISTRATION_ROUTE,
    component: Auth,
  },

  {
    path: DEVICE_ROUTE + '/:id',
    component: DevicePage,
  },
];
