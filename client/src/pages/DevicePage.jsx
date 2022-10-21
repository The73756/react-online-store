import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '..';
import DevicePageComponent from '../components/DevicePageComponent';
import { createBasketDevice, fetchBasketDevices } from '../http/basketApi';
import { fetchOneDevice } from '../http/deviceApi';

const DevicePage = observer(() => {
  const { id } = useParams();
  const { user, basket } = useContext(Context);
  const [device, setDevice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBasketLoading, setIsBasketLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const addDeviceToBasket = () => {
    const formData = new FormData();
    formData.append('deviceId', id);
    formData.append('basketId', user.userData.id);

    try {
      createBasketDevice(formData).then((data) => {
        console.log(data);
        setIsAdded(true);
      });
    } catch (e) {
      alert('Ошибка при добавлении товара в корзину');
      console.log(e);
    }
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

    try {
      if (user.isAuth) {
        fetchBasketDevices(user.userData.id)
          .then((data) => {
            basket.setBasketDevices(data.rows);
            basket.setBasketTotalCount(data.count);
            setIsAdded(basket.basketDevices.some((item) => item.id === +id));
          })
          .finally(() => setIsBasketLoading(false));
      }
    } catch (e) {
      alert('Ошибка при получении корзины');
      console.log(e);
    }
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>; //TODO: сделать лоадер
  }

  return (
    <DevicePageComponent
      {...device}
      isLoading={isLoading}
      addDeviceToBasket={addDeviceToBasket}
      isAdded={isAdded}
      isBasketLoading={isBasketLoading}
    />
  );
});

export default DevicePage;
