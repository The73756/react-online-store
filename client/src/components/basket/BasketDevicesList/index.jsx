import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../..';
import { deleteBasketDevice, updateBasketDevice } from '../../../http/basketApi';
import BasketDeviceItem from '../BasketDeviceItem';
import BasketDeviceLoader from '../BasketDeviceItem/BasketDeviceLoader';

import styles from './BasketDevicesList.module.scss';

const BasketDevicesList = observer(({ isLoading }) => {
  const { basket } = useContext(Context);
  const skeletons = [...new Array(3)].map((_, index) => <BasketDeviceLoader key={index} />);

  const deleteDeviceFromBasket = (basketItemId) => {
    const updatedBasket = basket.basketDevices.filter(
      (basketItem) => basketItem.id !== basketItemId,
    );

    basket.setBasketDevices(updatedBasket);
    basket.setBasketTotalPositions(basket.basketTotalPositions - 1);

    deleteBasketDevice({ id: basketItemId }).catch((e) => {
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
      {isLoading
        ? skeletons
        : basket.basketDevices.map((position) => (
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
