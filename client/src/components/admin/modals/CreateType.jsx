import { useState } from 'react';
import { createType } from '../../../http/deviceApi';
import Modal from '../../Modal';
import styles from './modals.module.scss';
import Button from '../../../theme/Button';
import Input from '../../../theme/Input';

const CreateType = ({ opened, onClose }) => {
  const [value, setValue] = useState('');

  const addType = (e) => {
    e.preventDefault();

    if (!value) {
      alert('Введите название типа!');
      return;
    }

    createType({ name: value })
      .then(() => {
        setValue('');
      })
      .finally(() => {
        onClose();
      }); // TODO: подумать над лоадером и оповещением об успешном добавлении + ошибке (и так везде)
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
          <Button type="submit">Добавить</Button>
          <Button variant="danger" className={styles.closeBtn} onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateType;
