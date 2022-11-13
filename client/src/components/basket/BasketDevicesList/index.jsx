import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../..';
import { deleteBasketDevice, updateBasketDevice } from '../../../http/basketApi';
import BasketDeviceItem from '../BasketDeviceItem';

import styles from './BasketDevicesList.module.scss';

const BasketDevicesList = observer(() => {
  const { basket } = useContext(Context);

  const deleteDeviceFromBasket = (basketItemId) => {
    const updatedBasket = basket.basketDevices.filter(
      (basketItem) => basketItem.id !== basketItemId,
    );

    basket.setBasketDevices(updatedBasket);
    basket.setBasketTotalPositions(basket.basketTotalPositions - 1);

    deleteBasketDevice({ id: basketItemId })
      .then(() => {
        alert('Устройство удалено из корзины');
      })
      .catch((e) => {
        alert('Ошибка при удалении устройства из корзины');
        console.log(e);
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
      {basket.basketDevices.map((position) => (
        <BasketDeviceItem
          key={position.id}
          count={position.count}
          basketItemId={position.id}
          variants={position.variants}
          {...position.device}
          onDelete={deleteDeviceFromBasket}
          onChangeCount={changeBasketDeviceCount}
        />
      ))}
    </main>
  );
});

export default BasketDevicesList;
