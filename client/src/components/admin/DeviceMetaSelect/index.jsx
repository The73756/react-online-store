import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import Button from '../../../theme/Button';

import styles from './DeviceMetaSelect.module.scss';

const DeviceMetaSelect = observer(({ rootClassname }) => {
  const { device } = useContext(Context);

  const [isDdTypeOpen, setIsDdTypeOpen] = useState(false);
  const [isDdBrandOpen, setIsDdBrandOpen] = useState(false);

  // TODO: сделать норм дропдавн

  return (
    <div className={`${styles.root} ${rootClassname}`}>
      <Button onClick={() => setIsDdTypeOpen(!isDdTypeOpen)}>
        {device.selectedType.name || 'Выберите тип'}
      </Button>
      <ul style={{ display: isDdTypeOpen ? 'block' : 'none' }} className={styles.list}>
        {device.types.map((type) => (
          <li key={type.id} className={styles.listItem}>
            <Button className={styles.listBtn} onClick={() => device.setSelectedType(type)}>
              {type.name}
            </Button>
          </li>
        ))}
      </ul>

      <Button onClick={() => setIsDdBrandOpen(!isDdBrandOpen)}>
        {device.selectedBrand.name || 'Выберите бренд'}
      </Button>
      <ul style={{ display: isDdBrandOpen ? 'block' : 'none' }} className={styles.list}>
        {device.brands.map((brand) => (
          <li key={brand.id} className={styles.listItem}>
            <Button className={styles.listBtn} onClick={() => device.setSelectedBrand(brand)}>
              {brand.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default DeviceMetaSelect;
