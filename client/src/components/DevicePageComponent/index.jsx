import star from '../../assets/star.png';
import styles from './DevicePageComponent.module.scss';

const DevicePageComponent = () => {
  const { name, price, rating, img } = {
    id: 1,
    name: 'Iphone 12 Pro',
    price: 25000,
    rating: 5,
    img: 'https://cdn.svyaznoy.ru/upload/iblock/fb8/ruru_iphone12pro_q121_graphite_pdp-image-1b.jpg/resize/483x483/hq/',
  };
  const descr = [
    { id: 1, title: 'Оперативная память', description: '15 гб' },
    { id: 2, title: 'Kaмepa', description: '12 мn' },
    { id: 3, title: 'Процессор', description: 'Пентиум 3' },
    { id: 4, title: 'Koл-во ядеp', description: '2' },
    { id: 5, title: 'Aккумулятор', description: '4000' },
  ];

  return (
    <div className='container'>
      <div className={styles.top}>
        <img className={styles.topImg} src={img} alt={name} />
        <div className={styles.topRatingBlock}>
          <h2 className={styles.title}>{name}</h2>
          <div className={styles.rating} style={{ backgroundImage: `url(${star})` }}>
            {rating}
          </div>
        </div>
        <div className={styles.topPriceBlock}>
          <h3 className={styles.price}>{price} Руб.</h3>
          <button className={styles.cartBtn}>Добавить в корзину</button>
        </div>
      </div>
      <div className={styles.bottom}>
        <h2>Характеристики</h2>
        {descr.map((info) => (
          <div key={info.id}>
            {info.title} : {info.description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicePageComponent;
