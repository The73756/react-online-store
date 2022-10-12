import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { login, registration } from '../../http/userApi';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/consts';

import styles from './AuthComponent.module.scss';

const AuthComponent = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const isLogin = location !== REGISTRATION_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;

    try {
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }

    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formItem}
            placeholder='Введите ваш e-mail'
          />
          <input
            type='password'
            autoComplete='on'
            className={styles.formItem}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Введите ваш пароль'
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

            <button type='submit' className={styles.formButton}>
              {isLogin ? 'Войти' : 'Регистрация'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default AuthComponent;
