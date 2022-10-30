import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import styles from './BrandsBar.module.scss';
import Button from '../../theme/Button';

const BrandsBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {device.brands.map((brand) => (
          <li className={styles.item} key={brand.id}>
            <Button
              className={`${brand.id === device.selectedBrand.id ? styles.active : ''}`}
              onClick={() => device.setSelectedBrand(brand)}>
              {brand.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default BrandsBar;
