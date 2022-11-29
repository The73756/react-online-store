import { useState } from 'react';
import { createBrand } from '../../../http/deviceApi';
import Modal from '../../Modal';
import styles from './modals.module.scss';
import Button from '../../../theme/Button';
import Input from '../../../theme/Input';

const CreateBrand = ({ opened, onClose }) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addBrand = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!value) {
      alert('Введите название бренда!');
      return;
    }

    createBrand({ name: value })
      .then(() => {
        setValue('');
        onClose();
      })
      .catch((e) => {
        alert('Ошибка при создании бренда!');
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <h2>Добавить бренд</h2>
      <form className={styles.form} onSubmit={addBrand}>
        <div className={styles.inputsBlock}>
          <Input
            className={styles.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Введите название бренда"
            required={true}
          />
        </div>

        <div className={styles.footer}>
          <Button type="submit" isLoading={isLoading}>
            Добавить
          </Button>
          <Button variant="danger" className={styles.closeBtn} onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateBrand;
