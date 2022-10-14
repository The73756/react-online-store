import { useContext, useEffect } from 'react';
import { Context } from '..';
import BrandsBar from '../components/BrandsBar';
import DevicesList from '../components/DevicesList';
import TypesSidebar from '../components/TypesSidebar';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi';

const Shop = () => {
  const { device } = useContext(Context);
  useEffect(() => {
    // TODO: вынести фетчинг по компонентам
    try {
      fetchTypes().then((data) => device.setTypes(data));
      fetchBrands().then((data) => device.setBrands(data));
      fetchDevices().then((data) => device.setDevices(data.rows));
    } catch (error) {
      console.log(error);
      alert('Ошибка при загрузке классификаций (типов/брендов)'); // TODO: доделать лоадер и обработку ошибок
    }
  }, []);

  return (
    <div className='shop-container'>
      <div className='shop-sidebar'>
        <TypesSidebar />
      </div>

      <div className='container'>
        <BrandsBar />
        <DevicesList />
      </div>
    </div>
  );
};

export default Shop;
