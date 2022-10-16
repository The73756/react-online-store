import { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import BasketDevicesList from '../components/BasketDevicesList';
import { fetchBasketDevices } from '../http/basketApi';

const Basket = () => {
  const { basket, user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    //TODO: сделать таких штуковин мб  document.title = 'Корзина';
    fetchBasketDevices(user.userData.id).then((data) => {
      basket.setBasketDevices(data.rows);
      basket.setBasketTotalCount(data.count);

      setIsLoading(false);
    });
  }, []);

  return (
    <div className='container'>
      <BasketDevicesList />
    </div>
  );
};

export default Basket;
