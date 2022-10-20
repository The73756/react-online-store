import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../..';
import star from '../../assets/star.png';
import { createBasketDevice } from '../../http/basketApi';
import { SHOP_ROUTE } from '../../utils/consts';
import styles from './DevicePageComponent.module.scss';

const DevicePageComponent = ({ name, price, rating, img, info, isLoading, id }) => {
  const { user } = useContext(Context);

  const isAdded = false; //TODO: доделать отображение добавленности в корзину
  const addDeviceToBasket = () => {
    const formData = new FormData();
    formData.append('deviceId', id);
    formData.append('basketId', user.userData.id);

    try {
      createBasketDevice(formData).then((data) => {
        console.log(data);
        alert('Товар добавлен в корзину');
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <div className={styles.top}>
        <img className={styles.topImg} src={`${process.env.REACT_APP_API_URL}/${img}`} alt={name} />
        <div className={styles.topRatingBlock}>
          <h2 className={styles.title}>{name}</h2>
          <div className={styles.rating} style={{ backgroundImage: `url(${star})` }}>
            {rating}
          </div>
        </div>
        <div className={styles.topPriceBlock}>
          <h3 className={styles.price}>{price} Руб.</h3>
          {isAdded ? (
            <Link className={styles.addBtn} to={SHOP_ROUTE}>
              Товар в корзине. Перейти
            </Link>
          ) : (
            <button className={styles.addBtn} onClick={addDeviceToBasket}>
              Добавить в корзину
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
