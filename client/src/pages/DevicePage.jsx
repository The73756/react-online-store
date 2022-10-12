import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DevicePageComponent from '../components/DevicePageComponent';
import { fetchOneDevice } from '../http/deviceApi';

const DevicePage = () => {
  const [device, setDevice] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  return <DevicePageComponent {...device}/>;
};

export default DevicePage;
