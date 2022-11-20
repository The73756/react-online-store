import Modal from '../../Modal';
import Button from '../../../theme/Button';
import Select from 'react-select';
import { useContext, useEffect, useState } from 'react';
import { deleteBrand, fetchBrands } from '../../../http/deviceApi';
import { Context } from '../../../index';

import styles from './modals.module.scss';

const DeleteBrand = ({ opened, onClose }) => {
  const { device } = useContext(Context);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    try {
      fetchBrands().then((data) => device.setBrands(data));
    } catch (e) {
      alert('Произошла ошибка при загрузке брендов!');
      console.log(e);
    }
  }, []);

  const handleDelete = () => {
    if (!selectedBrand) {
      alert('Выберите бренд!');
      return;
    }

    deleteBrand(selectedBrand.id)
      .then(() => {
        alert('Бренд успешно удален!');
        onClose();
      })
      .catch((e) => {
        alert('Произошла ошибка при удалении бренда!');
        console.log(e);
      });
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <h2>Удалить бренд</h2>
      <div className={styles.form}>
        <Select
          options={device.brands}
          getOptionLabel={(brand) => brand.name}
          getOptionValue={(brand) => brand.id}
          onChange={(selectedOption) => setSelectedBrand(selectedOption)}
          placeholder="Выберите бренд для удаления!"
        />

        <div className={styles.footer}>
          <Button onClick={handleDelete}>Удалить</Button>
          <Button variant="danger" className={styles.closeBtn} onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBrand;
