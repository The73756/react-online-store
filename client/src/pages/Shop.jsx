import BrandsBar from '../components/BrandsBar';
import DevicesList from '../components/DevicesList';
import TypesSidebar from '../components/TypesSidebar';

const Shop = () => {
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
