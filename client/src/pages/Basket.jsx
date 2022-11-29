import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import BasketDevicesList from '../components/basket/BasketDevicesList';
import { fetchBasketDevices } from '../http/basketApi';
import BasketBottom from '../theme/BasketInfo';
import NoItems from '../theme/NoItems';

const Basket = observer(() => {
  const { basket, user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user.isAuth) {
      fetchBasketDevices(user.userId)
        .then((data) => {
          basket.setBasketDevices(data);
          basket.setBasketTotalPositions(data.length);
        })
        .catch((e) => {
          alert('Ошибка при получении корзины');
          console.log(e);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (!basket.basketTotalPositions && !isLoading) {
    return (
      <div className="container">
        <NoItems
          title="Корзина пуста =("
          desc="Добавьте хотя бы 1 товар в корзину и возвращайтесь снова!"
        />
      </div>
    );
  }

  return (
    <div className="container">
      <BasketDevicesList isLoading={isLoading} />
      <BasketBottom
        totalPrice={basket.basketTotalPrice}
        totalCount={basket.basketTotalCount}
        totalPositions={basket.basketTotalPositions}
        isLoading={isLoading}
      />
    </div>
  );
});

export default Basket;
