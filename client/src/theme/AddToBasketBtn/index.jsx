import { Link } from 'react-router-dom';
import { BASKET_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import styles from './AddToBasketBtn.module.scss';
import btnStyles from '../Button/Button.module.scss';

const AddToBasketBtn = ({ isAuth, isAdded, isLoading, onAddToBasket, onClick, className }) => {
  const classes = `${styles.btn} ${className ? className : ''}`;

  if (!isAuth) {
    return (
      <span className={`${styles.notAuth} ${classes}`}>
        <Link to={LOGIN_ROUTE}>Войдите</Link> что бы добавить в корзину
      </span>
    );
  }

  if (isAdded) {
    return (
      <Link to={BASKET_ROUTE} className={`${styles.added}  ${classes}`} onClick={onClick}>
        Товар в корзине. <span className={styles.accent}>Перейти</span>
      </Link>
    );
  }
  return (
    <button
      className={`${classes} ${isLoading ? btnStyles.loading + ' ' + styles.unHovered : ''}`}
      onClick={onAddToBasket}>
      Добавить товар в корзину
    </button>
  );
};

export default AddToBasketBtn;
