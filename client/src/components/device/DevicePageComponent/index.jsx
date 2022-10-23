import { Link } from 'react-router-dom';
import { BASKET_ROUTE } from '../../../utils/consts';
import styles from './DevicePageComponent.module.scss';
import RatingComponent from '../../rating/RatingComponent';
import { useState } from 'react';

const DevicePageComponent = ({
  name,
  price,
  rating,
  img,
  info,
  id,
  addDeviceToBasket,
  isAdded,
  isBasketLoading,
  userRate,
  setUserRate,
  isUserRateLoading,
}) => {
  const [localRating, setLocalRating] = useState(rating);

  return (
    <div className='container'>
      <div className={styles.top}>
        <img className={styles.topImg} src={`${process.env.REACT_APP_API_URL}/${img}`} alt={name} />
        <div className={styles.topRatingBlock}>
          <h2 className={styles.title}>{name}</h2>
          <div>Рейтинг: {localRating}</div>
          {isUserRateLoading ? (
            <div>Рейтинг загружается...</div>
          ) : (
            //TODO: Сделать проверку *если рейтинг добавлен есть, если нет то то там*
            <>
              <div>Укажите свой Рейтинг:</div>
              <RatingComponent userRate={userRate} deviceId={id} setLocalRating={setLocalRating} />
            </>
          )}
        </div>
        <div className={styles.topPriceBlock}>
          <h3 className={styles.price}>{price} Руб.</h3>
          {!isBasketLoading ? (
            isAdded ? ( //TODO: Прикрутить норм лоадер
              <Link className={styles.addBtn} to={BASKET_ROUTE}>
                Товар в корзине. Перейти
              </Link>
            ) : (
              <button className={styles.addBtn} onClick={addDeviceToBasket}>
                Добавить в корзину
              </button>
            )
          ) : (
            <button className={styles.addBtn} onClick={addDeviceToBasket}>
              Загрузка
            </button>
          )}
        </div>
      </div>
      <div className={styles.bottom}>
        <h2>Характеристики</h2>
        {info.map((info) => (
          <div key={info.id}>
            {info.title} : {info.description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicePageComponent;
