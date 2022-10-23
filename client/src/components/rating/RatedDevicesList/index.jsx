import { useContext, useEffect, useState } from 'react';
import { Context } from '../../..';
import { fetchRatings } from '../../../http/ratingApi';

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
    <div>
      {rating.ratedDevices.map((device) => (
        <div key={device.id}>{device.id}</div>
      ))}
    </div>
  );
};

export default RatedDevicesList;
