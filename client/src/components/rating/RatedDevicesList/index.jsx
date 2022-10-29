import { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import { deleteRating, fetchRatings } from "../../../http/ratingApi";
import RatedDeviceItem from "../RatedDeviceItem";
import styles from "./RatedDevicesComponent.module.scss";

const RatedDevicesList = () => {
  const { rating, user } = useContext(Context);
  const [isLoading, setIsLodaing] = useState(true);
  const [isItemLoading, setIsItemLoading] = useState(false);

  const deleteRate = (id) => {
    setIsItemLoading(true);
    deleteRating(id)
      .then((data) => {
        console.log(data);
        rating.setRatedDevices(
          rating.ratedDevices.filter(
            (ratedDevice) => ratedDevice.ratingId !== id
          )
        );
        rating.setRatedDevicesCount(rating.ratedDevicesCount - 1);
      })
      .catch((e) => {
        alert(e);
        console.log(e);
      })
      .finally(() => setIsItemLoading(false));
  };

  useEffect(() => {
    setIsLodaing(true);

    if (user.isAuth) {
      fetchRatings(user.userId)
        .then((res) => {
          rating.setRatedDevices(res.rows);
          rating.setRatedDevicesCount(res.count);
        })
        .catch((e) => {
          alert("Ошибка при получении оценок");
          console.log(e);
        })
        .finally(() => setIsLodaing(false));
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {rating.ratedDevices.map((device) => (
        <RatedDeviceItem key={device.id} {...device} onDelete={deleteRate} />
      ))}
    </div>
  );
};

export default RatedDevicesList;
