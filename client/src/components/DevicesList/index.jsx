import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import DeviceItem from '../DeviceItem';
import styles from './DevicesList.module.scss';

const DevicesList = observer(() => {
  const { device, basket } = useContext(Context);

  return (
    <main className={styles.container}>
      {device.devices.map((device) => (
        <DeviceItem
          key={device.id}
          {...device}
          isAdded={basket.basketDevices.some((item) => item.id === device.id)}
        />
      ))}
    </main>
  );
});

export default DevicesList;
