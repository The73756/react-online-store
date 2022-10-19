import { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import BasketDevicesList from '../components/BasketDevicesList';
import { fetchBasketDevices } from '../http/basketApi';
import { check } from '../http/userApi';

const Basket = () => {
  const { basket } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    //TODO: сделать таких штуковин мб  document.title = 'Корзина';
    check().then((data) => {
      if (data.id) {
        try {
          fetchBasketDevices(data.id).then((data) => {
            basket.setBasketDevices(data.rows);
            basket.setBasketTotalCount(data.count);
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }, []);

  return (
    <div className='container'>
      <BasketDevicesList />
    </div>
  );
};

export default Basket;
