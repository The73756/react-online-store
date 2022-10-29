import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../..';
import { deleteBasketDevice, updateBasketDevice } from '../../../http/basketApi';
import BasketDeviceItem from '../BasketDeviceItem';

import styles from './BasketDevicesList.module.scss';

const BasketDevicesList = observer(() => {
  const { basket } = useContext(Context);

  const deleteDeviceFromBasket = (id) => {
    const updatedBasket = basket.basketDevices.filter((device) => device.basketItemId !== id);
    basket.setBasketDevices(updatedBasket);
    basket.setBasketTotalCount(basket.basketTotalCount - 1);
    deleteBasketDevice({ id }).then(() => {
      alert('Устройство удалено из корзины');
    });
  };

  const changeBasketDeviceCount = (id, count) => {
    updateBasketDevice({ id, count }).catch((err) => {
      alert('Ошибка при изменении количества товара');
      console.log(err);
    });
  };

  return (
    <main className={styles.container}>
      {basket.basketDevices.map((device) => (
        <BasketDeviceItem
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
