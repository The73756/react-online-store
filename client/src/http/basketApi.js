import { $authHost } from './index';

export const createBasketDevice = async (device) => {
  // noinspection CommaExpressionJS
  const formData = Object.entries(device).reduce(
    (formData, [key, value]) => (formData.append(key, JSON.stringify(value)), formData),
    new FormData(),
  );

  const { data } = await $authHost.post('/api/basket', formData);
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

export const updateBasketDevice = async (device) => {
  const { data } = await $authHost.put('/api/basket', device);
  return data;
};

export const deleteBasketDevice = async ({ id }) => {
  const { data } = await $authHost.delete('/api/basket', { params: { id } });
  return data;
};
