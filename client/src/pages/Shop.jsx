import ShopContainer from '../components/ShopContainer';
import TypesSidebar from '../components/TypesSidebar';

const Shop = () => {
  return (
    <div className='shop-container'>
      <div className='shop-sidebar'>
        <TypesSidebar />
      </div>

      <main className='container shop-products' style={{ width: '100%' }}>
        <ShopContainer>
          <span>1232123</span>
          <span>1232123</span>
          <span>1232123</span>
          <span>1232123</span>
        </ShopContainer>
      </main>
    </div>
  );
};

export default Shop;
