import { useContext, useState } from 'react';
import { Context } from '../../..';
import AddToBasketBtn from '../../../theme/AddToBasketBtn';
import RatingComponent from '../../rating/RatingComponent';
import { Lazy, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/lazy';
import styles from './DevicePageComponent.module.scss';
import SelectorContainer from '../../selector/SelectorContainer';

const DevicePageComponent = ({
  name,
  price,
  rating,
  photos,
  info,
  id,
  addDeviceToBasket,
  isUserDataLoading,
  isAdded,
  userRate,
}) => {
  const [localDeviceRating, setLocalDeviceRating] = useState(rating);
  const [localRate, setLocalRate] = useState(userRate);
  const [selectedVariant, setSelectedVariants] = useState({});
  const { user } = useContext(Context);

  const setVariantsObj = (id) => {
    /*
     *   [
     *     {variantId: 1, value: "name", cost: 42323, additionalInfo: "biba"},
     *   ]
     *
     *
     *
     *
     * */

    setSelectedVariants((prev) => ({ ...prev, [id]: { ...prev[id], id } }));
  };

  return (
    <div className="container">
      <div className={styles.top}>
        <span className={styles.wrapper}>
          <Swiper
            modules={[Pagination, Lazy]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            lazy={true}>
            {photos.map((photo) => (
              <SwiperSlide key={photo.id}>
                <img
                  className={styles.topImg}
                  src={`${process.env.REACT_APP_API_URL}/${photo.url}`}
                  alt={name}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </span>
        <div className={styles.topRatingBlock}>
          <h2 className={styles.title}>{name}</h2>
          <div>Рейтинг: {localDeviceRating.toFixed(1)}</div>
          {user.isAuth ? (
            isUserDataLoading ? (
              <div>Рейтинг загружается...</div>
            ) : (
              //TODO: Сделать проверку *если рейтинг добавлен есть, если нет то то там*
              <>
                <div>Ваша оценка: {localRate}</div>
                <RatingComponent
                  rate={localRate}
                  setRate={setLocalRate}
                  deviceId={id}
                  setLocalRating={setLocalDeviceRating}
                />
              </>
            )
          ) : (
            <div>Войдите что бы оценить</div>
          )}
        </div>
        <div className={styles.topPriceBlock}>
          <h3 className={styles.price}>{price} Руб.</h3>
          <AddToBasketBtn
            isAuth={user.isAuth}
            isLoading={isUserDataLoading}
            isAdded={isAdded}
            onAddToBasket={addDeviceToBasket}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <h2>Характеристики</h2>
        {info.map((info) => (
          <div key={info.id}>
            {info.title} :{' '}
            {info.variants.length > 0 ? (
              <SelectorContainer variants={info.variants} setGlobalState={setVariantsObj} />
            ) : (
              info.description
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicePageComponent;
