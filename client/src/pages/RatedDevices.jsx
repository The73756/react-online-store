import { useContext } from 'react';
import RatedDevicesList from '../components/rating/RatedDevicesList';
import { Context } from '../index';
import NoItems from '../theme/NoItems';

const RatedDevices = () => {
  const { rating } = useContext(Context);

  if (!rating.ratedDevicesCount) {
    return (
      <div className="container">
        <NoItems title="Оценок не найдено =(" desc="Здесь будут отображаться ваши оценки" />
      </div>
    );
  }

  return (
    <div className="container">
      <RatedDevicesList />
    </div>
  );
};

export default RatedDevices;
