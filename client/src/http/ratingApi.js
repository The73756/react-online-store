import { $authHost } from './index';

export const createRating = async (rating) => {
  const { data } = await $authHost.post('/api/rating', rating);
  return data;
};

export const fetchRatings = async (userId) => {
  const { data } = await $authHost.get('/api/rating', { params: { userId } });
  return data;
};

export const fetchOneRating = async ({ userId, deviceId }) => {
  const { data } = await $authHost.get(`api/rating/${userId}/${deviceId}`);
  return data;
};

export const deleteRating = async (id, deviceId) => {
  const { data } = await $authHost.delete(`api/rating`, { params: { id, deviceId } });
  return data;
};
