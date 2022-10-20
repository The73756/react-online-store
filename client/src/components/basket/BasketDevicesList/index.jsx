import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../..';
import { deleteBasketDevice } from '../../../http/basketApi';
import BasketDevice from '../BasketDevice';

import styles from './BasketDevicesList.module.scss';

const BasketDevicesList = observer(() => {
  const { basket } = useContext(Context);

  const deleteDeviceFromBasket = (id) => {
    const updatedBasket = basket.basketDevices.filter((device) => device.basketItemId !== id);
    basket.setBasketDevices(updatedBasket);
    deleteBasketDevice({ id }).then((data) => {
      alert('Устройство удалено из корзины');
    });
  };

  const changeBasketDeviceCount = (id, count) => {
    console.log('blyat');
  };

  return (
    <main className={styles.container}>
      {basket.basketDevices.map((device, idx) => (
        <div key={device.id + idx}>
          <BasketDevice
            {...device}
            onDelete={deleteDeviceFromBasket}
            onChangeCount={changeBasketDeviceCount}
          />
        </div>
      ))}
    </main>
  );
});

export default BasketDevicesList;
