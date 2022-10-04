import { Link } from 'react-router-dom';
import styles from './TypesSidebar.module.scss';

const TypesSidebar = () => {
  return (
    <aside className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={styles.link} to='/types/1'>
            Type 1
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to='/types/1'>
            Type 1
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to='/types/1'>
            Type 1
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to='/types/1'>
            Type 1
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default TypesSidebar;
