import { Link } from 'react-router-dom';
import { BASKET_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import styles from './AddToBasketBtn.module.scss';

const AddToBasketBtn = ({ isAuth, isAdded, isLoading, onAddToBasket, onClick, className }) => {
  const classes = `${styles.btn} ${className ? className : ''}`;
  if (!isAuth) {
    return (
      <span className={`${styles.notAuth} ${classes}`}>
        <Link to={LOGIN_ROUTE}>Войдите</Link> что бы добавить в корзину
      </span>
    );
  }

  if (isLoading) {
    return <button className={`${styles.loading} ${classes}`}>Загрузка...</button>;
  }

  if (isAdded) {
    return (
      <Link to={BASKET_ROUTE} className={`${styles.added} ${classes}`} onClick={onClick}>
        Товар в корзине. Показать
      </Link>
    );
  }
  return (
    <button className={` ${styles.btn}`} onClick={onAddToBasket}>
      Добавить товар в корзину
    </button>
  );
};

export default AddToBasketBtn;
