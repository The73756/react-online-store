import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../..';
import DeviceItem from '../DeviceItem';
import styles from './DevicesList.module.scss';
import NoItems from '../../../theme/NoItems';

const DevicesList = observer(() => {
  const { device, basket } = useContext(Context);

  if (device.totalCount === 0) {
    return (
      <NoItems
        title="Устройств не найдено"
        desc="Попробуйте изменить поисковый запрос или сбросить фильтры"
      />
    );
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
