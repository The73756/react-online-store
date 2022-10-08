import { useState } from 'react';
import Modal from '../Modal';
import styles from './AdminComponent.module.scss';
const AdminComponent = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button className={styles.btn}>Добавить бренд</button>
      <button className={styles.btn}>Добавить девайс</button>
      <button className={styles.btn}>Добавить тип</button>
      <button onClick={() => setOpened(true)}>Click Here</button>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <div>$@#LKJH:LKFHDFDHFJ</div>
      </Modal>
    </div>
  );
};

export default AdminComponent;
