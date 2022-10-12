import { observer } from 'mobx-react-lite';
import styles from './TypesSidebar.module.scss';

const TypesSidebar = observer(({ types }) => {
  return (
    <aside className={styles.container}>
      <ul className={styles.list}>
        {types.map((type) => (
          <li className={styles.item} key={type.id}>
            <button
              className={`${styles.btn} ${type.id === types.selectedType.id ? styles.active : ''}`}
              onClick={() => types.setSelectedType(type)}>
              {type.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
});

export default TypesSidebar;
