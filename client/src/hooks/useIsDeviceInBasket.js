import { useContext } from 'react';
import { Context } from '..';

export const useIsDeviceInBasket = (id) => {
  const { basket } = useContext(Context);
  return basket.basketDevices.some((item) => item.id === id);
};
