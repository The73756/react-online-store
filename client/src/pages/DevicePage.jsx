import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '..';
import DevicePageComponent from '../components/device/DevicePageComponent';
import { createBasketDevice, fetchBasketDevices } from '../http/basketApi';
import { fetchOneDevice } from '../http/deviceApi';
import { fetchOneRating } from '../http/ratingApi';
import DevicePageLoader from '../components/device/DevicePageComponent/DevicePageLoader';

const DevicePage = observer(() => {
  const { id } = useParams();
  const { user, basket } = useContext(Context);
  const [device, setDevice] = useState([]);
  const [userRate, setUserRate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [isBasketUpdating, setIsBasketUpdating] = useState(false);

  const addDeviceToBasket = (variantsObj, callback) => {
    setIsBasketUpdating(true);

    createBasketDevice({
      deviceId: +id,
      basketId: +user.userId,
      variantsId: variantsObj.map((variant) => variant.id),
    })
      .then(() => {
        fetchBasketDevices(user.userId)
          .then((data) => {
            basket.setBasketDevices(data);
            basket.setBasketTotalPositions(data.length);
            callback();
          })
          .finally(() => setIsBasketUpdating(false));
      })
      .catch((e) => {
        alert('Ошибка при добавлении товара в корзину');
        setIsBasketUpdating(false);
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
            basket.setBasketDevices(basketData);
            basket.setBasketTotalPositions(basketData.length);
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
    return (
      <div className="container">
        <DevicePageLoader />
      </div>
    );
  }

  return (
    <div className="container">
      <DevicePageComponent
        {...device}
        addDeviceToBasket={addDeviceToBasket}
        userRate={userRate}
        isBasketUpdating={isBasketUpdating}
        setUserRate={setUserRate}
      />
    </div>
  );
});

export default DevicePage;
