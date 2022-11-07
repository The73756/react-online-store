import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../..';
import DeviceItem from '../DeviceItem';
import styles from './DevicesList.module.scss';

const DevicesList = observer(() => {
  const { device, basket } = useContext(Context);

  if (device.totalCount === 0) {
    return <h3>Устройств не найдено</h3>;
  }

  return (
    <main className={styles.container}>
      {device.devices.map((device) => (
        <DeviceItem
          key={device.id}
          {...device}
          isAdded={basket.basketDevices.some((item) => item.device.id === device.id)}
        />
      ))}
    </main>
  );
});

export default DevicesList;
