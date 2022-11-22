import { Link } from 'react-router-dom';
import { DEVICE_ROUTE } from '../../../utils/consts';
import { Lazy, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/lazy';
import styles from './DeviceItem.module.scss';

const DeviceItem = ({ id, name, price, rating, isAdded, photos, type, brand }) => {
  const deviceType = type.name.slice(0, -1) ? type.name : 'No type';
  const deviceBrand = brand.name ? brand.name : 'No brand';

  return (
    <article className={styles.card} style={{ borderColor: isAdded ? 'green' : '#ccc' }}>
      <div>
        <Swiper
          modules={[Pagination, Lazy]}
          slidesPerView={1}
          lazy={true}
          pagination={{ clickable: true }}>
          {photos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <img
                src={`${process.env.REACT_APP_API_URL}/${photo.url}`}
                alt={name}
                className={styles.img}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.top}>
        <span className={styles.subtitle}>
          {deviceType}, {deviceBrand}
        </span>
        <div className={styles.rating}>
          <span>{rating.toFixed(1)}</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.1891 4.51715L9.22189 3.94058L7.44845 0.34527C7.40001 0.246832 7.32033 0.167144 7.22189 0.118707C6.97501 -0.00316805 6.67501 0.0983945 6.55158 0.34527L4.77814 3.94058L0.810952 4.51715C0.701577 4.53277 0.601577 4.58433 0.525014 4.66246C0.432454 4.75759 0.38145 4.88558 0.383207 5.0183C0.384965 5.15103 0.439342 5.27762 0.534389 5.37027L3.4047 8.16871L2.72658 12.1203C2.71067 12.2122 2.72085 12.3067 2.75594 12.3932C2.79103 12.4796 2.84964 12.5545 2.92512 12.6093C3.0006 12.6641 3.08993 12.6967 3.18298 12.7033C3.27603 12.71 3.36908 12.6904 3.45158 12.6468L7.00001 10.7812L10.5485 12.6468C10.6453 12.6984 10.7578 12.7156 10.8656 12.6968C11.1375 12.65 11.3203 12.3921 11.2735 12.1203L10.5953 8.16871L13.4656 5.37027C13.5438 5.29371 13.5953 5.19371 13.611 5.08433C13.6531 4.81089 13.4625 4.55777 13.1891 4.51715ZM9.38751 7.77496L9.95158 11.0609L7.00001 9.5109L4.04845 11.0625L4.61251 7.77652L2.22501 5.4484L5.52501 4.96871L7.00001 1.97964L8.47501 4.96871L11.775 5.4484L9.38751 7.77496Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.price}>{price} ₽</p>
      <Link to={`${DEVICE_ROUTE}/${id}`} className={styles.link} />
    </article>
  );
};

export default DeviceItem;
