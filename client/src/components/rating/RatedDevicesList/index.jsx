import { useContext, useEffect, useState } from 'react';
import { Context } from '../../..';
import { fetchRatings } from '../../../http/ratingApi';
import RatedDeviceItem from '../RatedDeviceItem';
import styles from './RatedDevicesComponent.module.scss';

const RatedDevicesList = () => {
  const { rating, user } = useContext(Context);
  const [isLoading, setIsLodaing] = useState(true);

  useEffect(() => {
    setIsLodaing(true);

    if (user.isAuth) {
      fetchRatings(user.userId)
        .then((res) => {
          rating.setRatedDevices(res.rows);
          rating.setRatedDevicesCount(res.count);
        })
        .catch((e) => {
          alert('Ошибка при получении оценок');
          console.log(e);
        })
        .finally(() => setIsLodaing(false));
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {rating.ratedDevices.map((device) => (
        <RatedDeviceItem key={device.id} {...device} />
      ))}
    </div>
  );
};

export default RatedDevicesList;
