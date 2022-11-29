import Modal from '../../Modal';
import Button from '../../../theme/Button';
import Select from 'react-select';
import { useContext, useEffect, useState } from 'react';
import { deleteType, fetchTypes } from '../../../http/deviceApi';
import { Context } from '../../../index';

import styles from './modals.module.scss';

const DeleteType = ({ opened, onClose }) => {
  const { device } = useContext(Context);
  const [selectedType, setSelectedType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      fetchTypes().then((data) => device.setTypes(data));
    } catch (e) {
      alert('Произошла ошибка при загрузке типов!');
      console.log(e);
    }
  }, []);

  const handleDelete = () => {
    setIsLoading(true);

    if (!selectedType) {
      alert('Выберите тип!');
      return;
    }

    deleteType(selectedType.id)
      .then(() => {
        onClose();
      })
      .catch((e) => {
        alert('Произошла ошибка при удалении типа!');
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <h2>Удалить тип</h2>
      <div className={styles.form}>
        <Select
          options={device.types}
          getOptionLabel={(type) => type.name}
          getOptionValue={(type) => type.id}
          onChange={(selectedOption) => setSelectedType(selectedOption)}
          placeholder="Выберите тип для удаления!"
        />

        <div className={styles.footer}>
          <Button onClick={handleDelete} isLoading={isLoading}>
            Удалить
          </Button>
          <Button variant="danger" className={styles.closeBtn} onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteType;
