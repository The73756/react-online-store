import { $authHost } from './index';

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

export const deleteBasketDevice = async ({ basketId, deviceId }) => {
  const { data } = await $authHost.delete('/api/basket', { params: { basketId, deviceId } });
  return data;
};
