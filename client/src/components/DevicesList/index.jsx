import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import DeviceItem from '../DeviceItem';
import styles from './DevicesList.module.scss';

const DevicesList = observer(() => {
  const { device, basket } = useContext(Context);

  const isDeviceInBasket = (device) => {
    return basket.basketDevices.some((item) => item.id === device.id);
  };

  return (
    <main className={styles.container}>
      {device.devices.map((device) => (
        <DeviceItem key={device.id} {...device} isAdded={isDeviceInBasket(device)} />
      ))}
    </main>
  );
});

export default DevicesList;
