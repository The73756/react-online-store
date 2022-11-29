import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import BrandsBar from '../components/BrandsBar';
import DevicesList from '../components/device/DevicesList';
import Pagination from '../components/Pagination';
import TypesSidebar from '../components/TypesSidebar';
import { fetchBasketDevices } from '../http/basketApi';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi';
import { fetchRatings } from '../http/ratingApi';
import Sort from '../components/Sort';

const Shop = observer(() => {
  const { device, basket, rating, user } = useContext(Context);
  const [deviceInfoLoading, setDeviceInfoLoading] = useState(true);
  const [isOptionsLoading, setIsOptionsLoading] = useState(true);
  const [isDevicesLoading, setIsDevicesLoading] = useState(true);

  useEffect(() => {
    setIsOptionsLoading(true);

    Promise.all([fetchTypes(), fetchBrands()])
      .then(([types, brands]) => {
        device.setTypes(types);
        device.setBrands(brands);
      })
      .catch((e) => {
        alert('ошибка при загрузке типов и брендов');
        console.log(e);
      })
      .finally(() => setIsOptionsLoading(false));
  }, []);

  useEffect(() => {
    setIsDevicesLoading(true);

    fetchDevices({
      typeId: device.selectedType.id,
      brandId: device.selectedBrand.id,
      page: device.page,
      limit: device.limit,
      search: device.search,
      sort: device.selectedSort,
      order: device.selectedOrder,
    })
      .then((data) => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      })
      .catch((e) => {
        alert('Ошибка при загрузке девайсов');
        console.log(e);
      })
      .finally(() => {
        setIsDevicesLoading(false);
      });
  }, [
    device.selectedType,
    device.selectedBrand,
    device.page,
    device.search,
    device.selectedSort,
    device.selectedOrder,
  ]);

  useEffect(() => {
    setDeviceInfoLoading(true);
    if (user.isAuth) {
      Promise.all([fetchBasketDevices(user.userId), fetchRatings(user.userId)])
        .then(([basketDevices, ratings]) => {
          basket.setBasketDevices(basketDevices);
          basket.setBasketTotalPositions(basketDevices.length);

          rating.setRatedDevices(ratings);
          rating.setRatedDevicesCount(ratings.length);
        })
        .catch((e) => {
          alert('Ошибка при загрузке корзины и рейтингов');
          console.log(e);
        })
        .finally(() => setDeviceInfoLoading((prev) => prev + 1));
    }
  }, []);

  return (
    <div className="shop-container">
      <div className="shop-sidebar-left">
        <TypesSidebar isLoading={isOptionsLoading} />
      </div>

      <div className="shop-sidebar-right">
        <Sort isLoading={isOptionsLoading} />
      </div>

      <div className="container">
        <BrandsBar isLoading={isOptionsLoading} />
        <DevicesList isLoading={isDevicesLoading && deviceInfoLoading} />
        <Pagination isLoading={isDevicesLoading && deviceInfoLoading} />
      </div>
    </div>
  );
});

export default Shop;
