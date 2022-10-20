import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DevicePageComponent from '../components/DevicePageComponent';
import { fetchOneDevice } from '../http/deviceApi';

const DevicePage = () => {
  const { id } = useParams();
  const [device, setDevice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchOneDevice(id)
      .then((data) => {
        setDevice(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return <DevicePageComponent {...device} isLoading={isLoading} />;
};

export default DevicePage;
