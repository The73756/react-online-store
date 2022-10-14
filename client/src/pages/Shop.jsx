import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Context } from '..';
import BrandsBar from '../components/BrandsBar';
import DevicesList from '../components/DevicesList';
import Pagination from '../components/Pagination';
import TypesSidebar from '../components/TypesSidebar';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi';

const Shop = observer(() => {
  const { device } = useContext(Context);
  useEffect(() => {
    // TODO: вынести фетчинг по компонентам
    try {
      fetchTypes().then((data) => device.setTypes(data));
      fetchBrands().then((data) => device.setBrands(data));
    } catch (error) {
      console.log(error);
      alert('Ошибка при загрузке классификаций (типов/брендов)'); // TODO: доделать лоадер и обработку ошибок
    }
  }, []);

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(
      (data) => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      },
    );
  }, [device.selectedType, device.selectedBrand, device.page]);

  return (
    <div className='shop-container'>
      <div className='shop-sidebar'>
        <TypesSidebar />
      </div>

      <div className='container'>
        <BrandsBar />
        <DevicesList />
        <Pagination />
      </div>
    </div>
  );
});

export default Shop;
