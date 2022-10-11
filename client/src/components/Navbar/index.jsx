import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import styles from './Navbar.module.scss';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../../utils/consts';

const Navbar = observer(() => {
  const { user } = useContext(Context);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <div className={styles.navbar}>
      <h1 className={styles.logo}>
        <Link className={styles.logoLink} to={SHOP_ROUTE} />
        Магазин
      </h1>
      <nav>
        <ul className={styles.navList}>
          {user.isAuth ? (
            <>
              <li className={styles.navItem}>
                <Link to='/' className={styles.navLink}>
                  Корзина
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to={ADMIN_ROUTE} className={styles.navLink}>
                  Админ панель
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to={LOGIN_ROUTE} onClick={logOut} className={styles.navLink}>
                  Выйти
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
    </div>
  );
});

export default Navbar;
