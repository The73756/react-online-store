import { useContext, useEffect, useState } from 'react';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import { deleteRating, fetchRatings } from '../../../http/ratingApi';
import RatedDeviceItem from '../RatedDeviceItem';
import styles from './RatedDevicesComponent.module.scss';
import { createBasketDevice, fetchBasketDevices } from '../../../http/basketApi';
import NoItems from '../../../theme/NoItems';
import RatedDeviceLoader from '../RatedDeviceItem/RatedDeviceLoader';

const RatedDevicesList = observer(() => {
  const { rating, basket, user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const skeletons = [...new Array(2)].map((_, index) => <RatedDeviceLoader key={index} />);

  const deleteRate = (id, deviceId) => {
    setIsItemLoading(true);

    deleteRating(id, deviceId)
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

  if (!rating.ratedDevicesCount && !isLoading) {
    return (
      <div className="container">
        <NoItems title="Оценок не найдено =(" desc="Здесь будут отображаться ваши оценки" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {isLoading
        ? skeletons
        : rating.ratedDevices.map((rate) => (
            <RatedDeviceItem
              key={rate.id}
              device={rate.device}
              {...rate}
              onDelete={deleteRate}
              onAddToBasket={addDeviceToBasket}
              isItemLoading={isItemLoading}
            />
          ))}
    </div>
  );
});

export default RatedDevicesList;
