import { $authHost, $host } from './index';

export const createBasketDevice = async (device) => {
  const { data } = await $authHost.post('/api/basket', device);
  return data;
};

export const fetchBasketDevices = async (basketId) => {
  const { data } = await $authHost.get('/api/basket', {
    params: {
      basketId,
    },
  });
  return data;
};
