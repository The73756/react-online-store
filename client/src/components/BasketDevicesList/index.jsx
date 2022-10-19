import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import { deleteBasketDevice } from '../../http/basketApi';
import DeviceItem from '../DeviceItem';

import styles from './BasketDevicesList.module.scss';

const BasketDevicesList = observer(() => {
  const { basket } = useContext(Context);

  const deleteDeviceFromBasket = (id) => {
    const updatedBasket = basket.basketDevices.filter((device) => device.basketItemId !== id);
    basket.setBasketDevices(updatedBasket);
    // Todo: Нужно будет создавать локальный стейт и удалять эту штуку из локального стейта, и потом отправлять запрос на сервер
    deleteBasketDevice({ id }).then((data) => {
      alert('Устройство удалено из корзины');
    });
  };

  return (
    <main className={styles.container}>
      {basket.basketDevices.map((device, idx) => (
        <div key={device.id + idx}>
          <DeviceItem {...device} />
          <p>Количество: {device.count}</p>
          <button onClick={() => deleteDeviceFromBasket(device.basketItemId)}>Удалить</button>
        </div>
      ))}
    </main>
  );
});

export default BasketDevicesList;
