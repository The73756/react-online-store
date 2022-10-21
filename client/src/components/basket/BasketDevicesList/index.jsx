import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../..';
import { deleteBasketDevice, updateBasketDevice } from '../../../http/basketApi';
import BasketDevice from '../BasketDevice';

import styles from './BasketDevicesList.module.scss';

const BasketDevicesList = observer(() => {
  const { basket } = useContext(Context);

  const deleteDeviceFromBasket = (id) => {
    const updatedBasket = basket.basketDevices.filter((device) => device.basketItemId !== id);
    basket.setBasketDevices(updatedBasket);
    basket.setBasketTotalCount(basket.basketTotalCount - 1);
    deleteBasketDevice({ id }).then((data) => {
      alert('Устройство удалено из корзины');
    });
  };

  const changeBasketDeviceCount = (id, count) => {
    updateBasketDevice({ id, count }).catch((err) => {
      alert('Ошибка при изменении количества товара');
    });
  };

  return (
    <main className={styles.container}>
      {basket.basketDevices.map((device, idx) => (
        <BasketDevice
          key={device.basketItemId}
          {...device}
          onDelete={deleteDeviceFromBasket}
          onChangeCount={changeBasketDeviceCount}
        />
      ))}
    </main>
  );
});

export default BasketDevicesList;
