import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DevicePageComponent from '../components/DevicePageComponent';
import { fetchOneDevice } from '../http/deviceApi';

const DevicePage = () => {
  const [device, setDevice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchOneDevice(id).then((data) => {
      setDevice(data);
      setIsLoading(false);
    });
    console.log(device);
  }, []);

  return <DevicePageComponent {...device} isLoading={isLoading} />;
};

export default DevicePage;
