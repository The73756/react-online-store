import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../..';
import AddToBasketBtn from '../../../theme/AddToBasketBtn';
import RatingComponent from '../../rating/RatingComponent';
import SelectorContainer from '../../selector/SelectorContainer';
import { Lazy, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/lazy';
import styles from './DevicePageComponent.module.scss';

const DevicePageComponent = observer(
  ({
    name,
    price,
    rating,
    photos,
    info,
    id,
    description,
    addDeviceToBasket,
    isUserDataLoading,
    isBasketUpdating,
    userRate,
  }) => {
    const [localDeviceRating, setLocalDeviceRating] = useState(rating);
    const [localRate, setLocalRate] = useState(userRate);
    const [selectedVariant, setSelectedVariant] = useState([]);
    const [isDeviceAdded, setIsDeviceAdded] = useState(false);
    const [localPrice, setLocalPrice] = useState(price);
    const { user, basket } = useContext(Context);

    const checkDeviceInBasket = () => {
      const basketItemVariants = basket?.basketDevices.filter((item) => item.device.id === +id);

      if (!basketItemVariants || !selectedVariant.length) {
        setIsDeviceAdded(basket?.basketDevices.some((item) => item.device.id === +id));
      } else {
        const variantsId = selectedVariant.map((variant) => variant.id);
        const basketVariantsId = [];

        basketItemVariants.forEach((item) => {
          item.variants.forEach((variant) => {
            basketVariantsId.push(variant.device_variant.id);
          });
        });

        setIsDeviceAdded(variantsId.every((variantId) => basketVariantsId.includes(variantId)));
      }
    };

    useEffect(() => {
      const initVariants = [];

      info.forEach((item) => {
        if (item.variants.length) {
          initVariants.push({ id: item.variants[0].id, infoId: item.id }); // add first variant of each info
        }
      });

      setSelectedVariant(initVariants);
      checkDeviceInBasket();
    }, []);

    // not sure if this is the best way to do it, but it works
    useEffect(() => {
      checkDeviceInBasket();
    }, [selectedVariant]);

    const setVariantsObj = (infoId, id) => {
      const item = selectedVariant.find((variant) => variant.infoId === infoId);

      if (item) {
        setSelectedVariant((prev) =>
          prev.map((variant) => (variant.infoId === infoId ? { ...variant, id } : variant)),
        );
      } else {
        setSelectedVariant([...selectedVariant, { infoId, id }]);
      }
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
            <div className={styles.desc}>{description}</div>
          </div>
          <div>
            <h3 className={styles.price}>{localPrice} Руб.</h3>
            <AddToBasketBtn
              isAuth={user.isAuth}
              isLoading={isUserDataLoading || isBasketUpdating}
              isAdded={isDeviceAdded}
              onAddToBasket={() => addDeviceToBasket(selectedVariant, checkDeviceInBasket)}
            />
          </div>
        </div>
        <div>
          <h2>Характеристики</h2>
          {info.map((info) => (
            <div key={info.id}>
              {info.title} :{' '}
              {info.variants.length > 0 ? (
                <SelectorContainer
                  infoId={info.id}
                  variants={info.variants}
                  setGlobalState={setVariantsObj}
                  setPrice={setLocalPrice}
                  price={price}
                />
              ) : (
                info.description
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

export default DevicePageComponent;
