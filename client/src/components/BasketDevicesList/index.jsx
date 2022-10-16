import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import DeviceItem from '../DeviceItem';

import styles from './BasketDevicesList.module.scss';

const BasketDevicesList = observer(() => {
  const { basket } = useContext(Context);

  return (
    <main className={styles.container}>
      {basket.basketDevices.map((device) => (
        <div key={device.id}>
          <DeviceItem {...device} />
          <p>Количество: {device.count}</p>
        </div>
      ))}
    </main>
  );
});

export default BasketDevicesList;
