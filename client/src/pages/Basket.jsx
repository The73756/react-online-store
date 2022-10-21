import { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import BasketDevicesList from '../components/basket/BasketDevicesList';
import { fetchBasketDevices } from '../http/basketApi';
import { check } from '../http/userApi';

const Basket = () => {
  const { basket, user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    //TODO: сделать таких штуковин мб  document.title = 'Корзина';

    try {
      fetchBasketDevices(user.userData.id)
        .then((data) => {
          basket.setBasketDevices(data.rows);
          basket.setBasketTotalCount(data.count);
        })
        .finally(() => setIsLoading(false));
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className='container'>
      <BasketDevicesList />
    </div>
  );
};

export default Basket;
