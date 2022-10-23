import { $authHost } from './index';

export const createRating = async (rating) => {
  const { data } = await $authHost.post('/api/rating', rating);
  return data;
};
