import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import Button from '../../../theme/Button';
import { DEVICE_ROUTE } from '../../../utils/consts';
import { Context } from '../../../index';
import { Lazy, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/lazy';
import styles from './BasketDevice.module.scss';

const BasketDeviceItem = ({
  id,
  name,
  price,
  rating,
  photos,
  onDelete,
  onChangeCount,
  type,
  brand,
  count,
  basketItemId,
}) => {
  const { basket } = useContext(Context);
  const [localCount, setLocalCount] = useState(count);
  const debouncedCount = useDebounce(onChangeCount, 400);

  const incrementCount = () => {
    setLocalCount(localCount + 1);
    debouncedCount(basketItemId, localCount + 1);

    basket.setBasketTotalPrice(basket.basketTotalPrice + price);
    basket.setBasketTotalCount(basket.basketTotalCount + 1);
  };

  const decrementCount = () => {
    if (localCount - 1 <= 0) {
      setLocalCount(0);
      onDelete(basketItemId, localCount);
    } else {
      setLocalCount(localCount - 1);
      debouncedCount(basketItemId, localCount - 1);
    }

    basket.setBasketTotalPrice(basket.basketTotalPrice - price);
    basket.setBasketTotalCount(basket.basketTotalCount - 1);
  };

  return (
    <article className={styles.item}>
      <div className={styles.itemImg}>
        <Swiper
          modules={[Pagination, Lazy]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          lazy={true}>
          {photos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <img
                src={`${process.env.REACT_APP_API_URL}/${photo.url}`}
                alt={name}
                key={photo.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.itemInfo}>
        <h3>{name}</h3>
        <p>
          {type.name.slice(0, -1)}, {brand.name}
        </p>
        <Link to={`${DEVICE_ROUTE}/${id}`} className={styles.link} />
      </div>

      <div className={styles.itemRating}>
        <p>Рейтинг: {rating.toFixed(1)}</p>
      </div>

      <div className={styles.itemCount}>
        <Button
          className={styles.itemBtn}
          onClick={decrementCount}
          aria-label="Уменьшить количество">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#000"
            />
          </svg>
        </Button>
        <b>{localCount}</b>
        <Button
          className={styles.itemBtn}
          onClick={incrementCount}
          aria-label="Увеличить количество">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#000"
            />
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#000"
            />
          </svg>
        </Button>
      </div>
      <div className={styles.itemPrice}>
        <b>Итого: {price * localCount} Руб.</b>
        <div>
          <Button
            className={styles.itemBtn}
            variant="danger"
            onClick={() => onDelete({ basketItemId, price, count: localCount })}>
            <svg
              style={{ transform: 'rotate(45deg)' }}
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#fff"
              />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#fff"
              />
            </svg>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default BasketDeviceItem;
