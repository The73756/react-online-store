import { useState } from 'react';
import { createBrand } from '../../../http/deviceApi';
import Modal from '../../Modal';
import styles from './modals.module.scss';
import Button from '../../../theme/Button';

const CreateBrand = ({ opened, onClose }) => {
  const [value, setValue] = useState('');

  const addBrand = (e) => {
    e.preventDefault();

    if (!value) {
      alert('Введите название бренда!');
      return;
    }

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
      <form className={styles.form} onSubmit={addBrand}>
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
          <Button type="submit">Добавить</Button>
          <Button variant="danger" className={styles.closeBtn} onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateBrand;
