import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import styles from './TypesSidebar.module.scss';
import Button from '../../theme/Button';

const TypesSidebar = observer(() => {
  const { device } = useContext(Context);

  const handleChangeType = (type) => {
    if (device.selectedType.id === type.id) {
      device.setSelectedType({});
    } else {
      device.setSelectedType(type);
    }
  };

  return (
    <aside className={styles.container}>
      <ul className={styles.list}>
        {device.types.map((type) => (
          <li className={styles.item} key={type.id}>
            <Button
              className={`${styles.btn} ${type.id === device.selectedType.id ? styles.active : ''}`}
              onClick={() => handleChangeType(type)}>
              {type.name}
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  );
});

export default TypesSidebar;
