import styles from './BasketBottom.module.scss';
import Button from '../Button';
import { useState } from 'react';
import AlertModal from '../AlertModal';

const BasketBottom = ({ totalPrice, totalCount, totalPositions }) => {
  const [opened, setOpened] = useState(false);
  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <b className={styles.accent}>Итого:</b> {totalPrice} руб.
        </li>
        <li className={styles.listItem}>
          <b className={styles.accent}>Всего в корзине:</b> {totalCount}
        </li>
        <li className={styles.listItem}>
          <b className={styles.accent}>Всего позиций:</b> {totalPositions}
        </li>
      </ul>

      <Button variant="success" className={styles.btn} onClick={() => setOpened(true)}>
        Создать заказ
      </Button>

      <AlertModal opened={opened} onClose={() => setOpened(false)} title="Что то пошло не так...">
        <p className={styles.modalDesc}>
          Магазин создан в учебных целях, по этому создание заказов не возможно.
        </p>
        <p className={styles.modalDesc}>
          Буду рад звездочке на гитхабе, или любой другой обратной связи =)
        </p>
        <p className={styles.modalDesc}>
          Репозиторий с проектом:
          <a
            className={styles.modalLink}
            href="https://github.com/The73756/react-online-store"
            target="_blank">
            Github
          </a>
        </p>
      </AlertModal>
    </div>
  );
};

export default BasketBottom;
