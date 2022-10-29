import { useContext, useState } from "react";
import { Context } from "../../..";
import AddToBasketBtn from "../../../theme/AddToBasketBtn";
import RatingComponent from "../../rating/RatingComponent";
import styles from "./DevicePageComponent.module.scss";

const DevicePageComponent = ({
  name,
  price,
  rating,
  img,
  info,
  id,
  addDeviceToBasket,
  isUserDataLoading,
  isAdded,
  userRate,
}) => {
  const [localDeviceRating, setLocalDeviceRating] = useState(rating);
  const [localRate, setLocalRate] = useState(userRate);
  const { user } = useContext(Context);

  return (
    <div className="container">
      <div className={styles.top}>
        <img
          className={styles.topImg}
          src={`${process.env.REACT_APP_API_URL}/${img}`}
          alt={name}
        />
        <div className={styles.topRatingBlock}>
          <h2 className={styles.title}>{name}</h2>
          <div>Рейтинг: {localDeviceRating}</div>
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
            {info.title} : {info.description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicePageComponent;
