import { useState } from 'react';
import { createType } from '../../../http/deviceApi';
import Modal from '../../Modal';
import styles from './modals.module.scss';
import Button from '../../../theme/Button';
import Input from '../../../theme/Input';

const CreateType = ({ opened, onClose }) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addType = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!value) {
      alert('Введите название типа!');
      return;
    }

    createType({ name: value })
      .then(() => {
        setValue('');
        onClose();
      })
      .catch((e) => {
        alert('Ошибка при создании типа!');
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <h2>Добавить тип</h2>
      <form className={styles.form} onSubmit={addType}>
        <div className={styles.inputsBlock}>
          <Input
            className={styles.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Введите название типа"
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

export default CreateType;
