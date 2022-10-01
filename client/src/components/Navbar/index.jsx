import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import styles from './Navbar.module.scss';
import { LOGIN_ROUTE } from '../../utils/consts';

const Navbar = observer(() => {
  const { user } = useContext(Context);
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>
        Магазин
        <Link className={styles.logoLink} to='/' />
      </h1>
      <ul className={styles.navList}>
        {user.isAuth ? (
          <>
            {' '}
            <li className={styles.navItem}>
              <Link to='/' className={styles.navLink}>
                Корзина
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to='/' className={styles.navLink}>
                Админ панель
              </Link>
            </li>
          </>
        ) : (
          <li className={styles.navItem}>
            <Link to={LOGIN_ROUTE} className={styles.navLink}>
              Авторизация
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
});

export default Navbar;
