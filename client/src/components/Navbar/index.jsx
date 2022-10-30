import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import styles from './Navbar.module.scss';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  RATING_ROUTE,
  SHOP_ROUTE,
} from '../../utils/consts';

const Navbar = observer(() => {
  const { user, basket, rating } = useContext(Context);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);

    basket.setBasketDevices([]);
    basket.setBasketTotalPositions(0);

    rating.setRatedDevices([]);
    rating.setRatedDevicesCount(0);

    localStorage.removeItem('token');
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
                <Link to={BASKET_ROUTE} className={styles.navLink}>
                  Корзина {basket.basketTotalPositions}
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to={RATING_ROUTE} className={styles.navLink}>
                  Ваши оценки
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
