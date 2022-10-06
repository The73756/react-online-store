import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import styles from './TypesSidebar.module.scss';

const TypesSidebar = observer(() => {
  const { device } = useContext(Context);

  return (
    <aside className={styles.container}>
      <ul className={styles.list}>
        {device.types.map((type) => (
          <li className={styles.item} key={type.id}>
            <button
              className={`${styles.btn} ${type.id === device.selectedType.id ? styles.active : ''}`}
              onClick={() => device.setSelectedType(type)}>
              {type.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
});

export default TypesSidebar;
