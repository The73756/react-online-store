import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import styles from './BrandsBar.module.scss';
import Button from '../../theme/Button';
import BrandsLoader from './BrandsLoader';

const BrandsBar = observer(({ isLoading }) => {
  const { device } = useContext(Context);
  const skeletons = [...new Array(3)].map((_, index) => (
    <li className={styles.item} key={index}>
      <BrandsLoader />
    </li>
  ));

  const handleChangeBrand = (brand) => {
    if (device.selectedBrand.id === brand.id) {
      device.setSelectedBrand({});
    } else {
      device.setSelectedBrand(brand);
    }
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {isLoading
          ? skeletons
          : device.brands.map((brand) => (
              <li className={styles.item} key={brand.id}>
                <Button
                  className={`${brand.id === device.selectedBrand.id ? styles.active : ''}`}
                  onClick={() => handleChangeBrand(brand)}>
                  {brand.name}
                </Button>
              </li>
            ))}
      </ul>
    </div>
  );
});

export default BrandsBar;
