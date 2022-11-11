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
  const [loadedComponents, setLoadedComponents] = useState(0);
  const [isDevicesLoading, setIsDevicesLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchTypes(), fetchBrands()])
      .then(([types, brands]) => {
        device.setTypes(types);
        device.setBrands(brands);
      })
      .catch((e) => {
        alert('ошибка при загрузке типов и брендов');
        console.log(e);
      })
      .finally(() => setLoadedComponents((prev) => prev + 1));
  }, []);

  useEffect(() => {
    setIsDevicesLoading(false);

    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      device.limit,
      device.search,
      device.selectedSort,
      device.selectedOrder,
    )
      .then((data) => {
        device.setDevices(data);
        device.setTotalCount(data.length);
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
        .finally(() => setLoadedComponents((prev) => prev + 1));
    }
  }, []);

  if (isDevicesLoading || loadedComponents < 2) {
    // TODO: переделать лоадер мб
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="shop-container">
      <div className="shop-sidebar-left">
        <TypesSidebar />
      </div>

      <div className="shop-sidebar-right">
        <Sort />
      </div>

      <div className="container">
        <BrandsBar />
        <DevicesList />
        <Pagination />
      </div>
    </div>
  );
});

export default Shop;
