import { useState } from 'react';
import { createBrand } from '../../http/deviceApi';
import Modal from '../Modal';
import styles from './modals.module.scss';

const CreateBrand = ({ opened, onClose }) => {
  const [value, setValue] = useState('');

  const addBrand = (e) => {
    e.preventDefault();
    createBrand({ name: value })
      .then(() => {
        setValue('');
      })
      .finally(() => {
        onClose();
      }); // TODO: подумать над лоадером
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <form action="" className={styles.form} onSubmit={addBrand}>
        <div className={styles.inputsBlock}>
          <input
            className={styles.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Введите название бренда"
          />
        </div>

        <div className={styles.footer}>
          <button type="submit" className={styles.btn}>
            Добавить
          </button>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            Закрыть
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateBrand;
