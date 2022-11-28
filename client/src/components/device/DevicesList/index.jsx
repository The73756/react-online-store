import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../..';
import styles from './DevicesList.module.scss';
import NoItems from '../../../theme/NoItems';
import DeviceItem from '../DeviceItem';
import DeviceLoader from '../DeviceItem/DeviceLoader';

const DevicesList = observer(({ isLoading }) => {
  const { device, basket } = useContext(Context);
  const skeletons = [...new Array(4)].map((_, index) => <DeviceLoader key={index} />);

  if (device.totalCount === 0 && !isLoading) {
    return (
      <NoItems
        title="Устройств не найдено"
        desc="Попробуйте изменить поисковый запрос или сбросить фильтры"
      />
    );
  }

  return (
    <main className={styles.container}>
      {isLoading
        ? skeletons
        : device.devices.map((device) => (
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
