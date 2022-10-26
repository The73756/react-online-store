import ReactStars from 'react-rating-stars-component';
import styles from './RatingComponent.module.scss';
import { useContext } from 'react';
import { Context } from '../../..';
import { createRating } from '../../../http/ratingApi';

const RatingComponent = ({ deviceId, setLocalRating, rate, setRate }) => {
  const { user } = useContext(Context);

  const changeRating = (newRating) => {
    setRate(newRating);

    const formData = new FormData();
    formData.append('deviceId', deviceId);
    formData.append('userId', user.userId);
    formData.append('rate', newRating);

    try {
      createRating(formData).then((data) => {
        console.log(data);
        if (data.newRating) {
          setLocalRating(data.newRating);
          alert(data.message);
        } else {
          alert('Вы уже оценивали этот товар');
        }
      });
    } catch (e) {
      alert('Ошибка при изменении рейтинга');
      console.log(e);
    }
  };

  return (
    <ReactStars
      count={5}
      onChange={changeRating}
      value={rate}
      size={40}
      isHalf={true}
      activeColor='#ffd700'
      classNames={user.isAuth && styles.rating}
      edit={user.isAuth}
    />
  );
};

export default RatingComponent;
