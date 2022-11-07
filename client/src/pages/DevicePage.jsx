import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '..';
import DevicePageComponent from '../components/device/DevicePageComponent';
import { createBasketDevice, fetchBasketDevices } from '../http/basketApi';
import { fetchOneDevice } from '../http/deviceApi';
import { fetchOneRating } from '../http/ratingApi';

const DevicePage = observer(() => {
  const { id } = useParams();
  const { user, basket } = useContext(Context);
  const [device, setDevice] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [userRate, setUserRate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  const addDeviceToBasket = () => {
    createBasketDevice({ deviceId: id, basketId: user.userId, deviceVariantId: 1 })
      .then(() => {
        setIsAdded(true);
        basket.setBasketTotalPositions(basket.basketTotalPositions + 1);
      })
      .catch((e) => {
        alert('Ошибка при добавлении товара в корзину');
        console.log(e);
      });
  };

  useEffect(() => {
    try {
      fetchOneDevice(id)
        .then((data) => {
          setDevice(data);
        })
        .finally(() => setIsLoading(false));
    } catch (e) {
      alert('Ошибка при получении устройства');
      console.log(e);
    }

    if (user.isAuth) {
      Promise.all([
        fetchBasketDevices(user.userId),
        fetchOneRating({ userId: user.userId, deviceId: id }),
      ])
        .then(([basketData, ratingData]) => {
          if (basketData) {
            basket.setBasketDevices(basketData.rows);
            basket.setBasketTotalPositions(basketData.count);
            setIsAdded(basket.basketDevices.some((item) => item.id === +id));
          }

          if (ratingData) {
            setUserRate(ratingData.rate);
          }
        })
        .catch((e) => {
          alert('Ошибка при получении пользовательских данных');
          console.log(e);
        })
        .finally(() => {
          setIsUserDataLoading(false);
        });
    } else {
      setIsUserDataLoading(false);
    }
  }, []);

  if (isLoading || isUserDataLoading) {
    //TODO: пофиксить костыль (isUserDataLoading)
    return <div>Загрузка...</div>; //TODO: сделать лоадер
  }

  return (
    <div className="container">
      <DevicePageComponent
        {...device}
        isLoading={isLoading}
        addDeviceToBasket={addDeviceToBasket}
        isAdded={isAdded}
        isUserDataLoading={isUserDataLoading}
        userRate={userRate}
        setUserRate={setUserRate}
      />
    </div>
  );
});

export default DevicePage;
