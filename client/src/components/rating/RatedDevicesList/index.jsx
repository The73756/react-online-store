import { useContext, useEffect, useState } from 'react';
import { Context } from '../../..';
import { fetchRatings } from '../../../http/ratingApi';

const RatedDevicesList = () => {
  const { rating, user } = useContext(Context);
  const [isLoading, setIsLodaing] = useState(true);

  useEffect(() => {
    setIsLodaing(true);
    fetchRatings(user.userData.id)
      .then((data) => {
        rating.setRatedDevices(data.rows);
        rating.setRatedDevicesCount(data.count);
        console.log(user.userData.id, data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setIsLodaing(false));
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
