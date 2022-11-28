import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import Button from '../../theme/Button';
import TypesSidebarLoader from './TypesSidebarLoader';
import styles from './TypesSidebar.module.scss';

const TypesSidebar = observer(({ isLoading }) => {
  const { device } = useContext(Context);
  const skeletons = [...new Array(3)].map((_, index) => (
    <li className={styles.item} key={index}>
      <TypesSidebarLoader />
    </li>
  ));

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
        {isLoading
          ? skeletons
          : device.types.map((type) => (
              <li className={styles.item} key={type.id}>
                <Button
                  className={`${styles.btn} ${
                    type.id === device.selectedType.id ? styles.active : ''
                  }`}
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
