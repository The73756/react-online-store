import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { login, registration } from '../../http/userApi';
import {
  ADMIN_ROLE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  USER_ROLE,
} from '../../utils/consts';

import styles from './AuthComponent.module.scss';
import Button from '../../theme/Button';

const AuthComponent = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const isLogin = location !== REGISTRATION_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;

    try {
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password, `${isAdmin ? ADMIN_ROLE : USER_ROLE}`);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formItem}
            placeholder="Введите ваш e-mail"
          />
          <input
            type="password"
            autoComplete="on"
            className={styles.formItem}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите ваш пароль"
          />
          <div className={styles.formBottom}>
            {isLogin ? (
              <span>
                Нет аккаунта?
                <Link to={REGISTRATION_ROUTE} className={styles.formLink}>
                  Зарегистрируйтесь!
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

            {!isLogin && (
              <div>
                Зарегистрироватся как администратор?
                <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
              </div>
            )}

            <Button type="submit" variant="success" className={styles.formButton}>
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default AuthComponent;
