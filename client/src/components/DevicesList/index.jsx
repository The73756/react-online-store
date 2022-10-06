import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import DeivceItem from '../DeivceItem';
import styles from './DevicesList.module.scss';

const DevicesList = observer(() => {
  const { device } = useContext(Context);

  return (
    <main className={styles.container}>
      {device.devices.map((device) => (
        <DeivceItem key={device.id} {...device} />
      ))}
    </main>
  );
});

export default DevicesList;
