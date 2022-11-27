import styles from './BasketBottom.module.scss';
import Button from '../Button';
import { useState } from 'react';
import Modal from '../../components/Modal';

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

      <Modal opened={opened} onClose={() => setOpened(false)}>
        <div className={styles.modal}>
          <h3 className={styles.modalTitle}>Что то пошло не так...</h3>
          <p className={styles.modalDescr}>
            Магазин создан в учебных целях, по этому создание заказов не возможно.
          </p>
          <p className={styles.modalDescr}>
            Буду рад звездочке на гитхабе, или любой другой обратной связи =)
          </p>
          <p className={styles.modalDescr}>
            Репозиторий с проектом:
            <a
              className={styles.modalLink}
              href="https://github.com/The73756/react-online-store"
              target="_blank">
              Github
            </a>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default BasketBottom;
