import { Link, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import styles from './AuthComponent.module.scss';

const AuthComponent = () => {
  const location = useLocation().pathname;
  const isLogin = location !== REGISTRATION_ROUTE;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <form action='' className={styles.form}>
          <input type='text' className={styles.formItem} placeholder='Введите ваш e-mail' />
          <input type='text' className={styles.formItem} placeholder='Введите ваш пароль' />
          <div className={styles.formBottom}>
            {isLogin ? (
              <span>
                Нет аккаунта?
                <Link to={REGISTRATION_ROUTE} className={styles.formLink}>
                  Зарегестрируйтесь!
                </Link>
              </span>
            ) : (
              <span>
                Есть аккаунт?
                <Link to={LOGIN_ROUTE} className={styles.formLink}>
                  Войдите!
                </Link>
              </span>
            )}

            <button className={styles.formButton}>
              {isLogin ? 'Войти' : 'Регистрация'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthComponent;
