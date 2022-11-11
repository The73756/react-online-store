import { useContext, useEffect, useState } from 'react';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import { deleteRating, fetchRatings } from '../../../http/ratingApi';
import RatedDeviceItem from '../RatedDeviceItem';
import styles from './RatedDevicesComponent.module.scss';
import { createBasketDevice, fetchBasketDevices } from '../../../http/basketApi';

const RatedDevicesList = observer(() => {
  const { rating, basket, user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [isItemLoading, setIsItemLoading] = useState(false);

  const deleteRate = (id) => {
    setIsItemLoading(true);

    deleteRating(id)
      .then((data) => {
        console.log(data);
        rating.setRatedDevices(rating.ratedDevices.filter((ratedDevice) => ratedDevice.id !== id));
        rating.setRatedDevicesCount(rating.ratedDevicesCount - 1);
      })
      .catch((e) => {
        alert(e);
        console.log(e);
      })
      .finally(() => setIsItemLoading(false));
  };

  const addDeviceToBasket = (id, callback) => {
    setIsItemLoading(true);

    createBasketDevice({ deviceId: id, basketId: user.userId })
      .then(() => {
        callback();
        alert('Товар успешно добавлен в корзину');
      })
      .catch((e) => {
        alert('Ошибка при добавлении товара в корзину');
        console.log(e);
      })
      .finally(() => setIsItemLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);

    if (user.isAuth) {
      Promise.all([fetchRatings(user.userId), fetchBasketDevices(user.userId)])
        .then(([ratingsData, basketData]) => {
          if (ratingsData) {
            rating.setRatedDevices(ratingsData);
            rating.setRatedDevicesCount(ratingsData.length);
          }

          if (basketData) {
            basket.setBasketDevices(basketData);
            basket.setBasketTotalPositions(basketData.length);
          }
        })
        .catch((e) => {
          alert('Ошибка при получении пользовательских данных');
          console.log(e);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {rating.ratedDevices.map((rate) => (
        <RatedDeviceItem
          key={rate.id}
          device={rate.device}
          {...rate}
          onDelete={deleteRate}
          onAddToBasket={addDeviceToBasket}
          isItemLoading={isItemLoading}
          isAdded={basket.basketDevices.some((item) => item.device.id === rate.device.id)}
        />
      ))}
    </div>
  );
});

export default RatedDevicesList;
