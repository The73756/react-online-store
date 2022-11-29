import Modal from '../../Modal';
import Button from '../../../theme/Button';
import Select from 'react-select';
import { useContext, useEffect, useState } from 'react';
import { deleteDevice, fetchDevices } from '../../../http/deviceApi';
import { Context } from '../../../index';

import styles from './modals.module.scss';

const DeleteDevice = ({ opened, onClose }) => {
  const { device } = useContext(Context);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      fetchDevices({
        page: 1,
        limit: device.totalCount + 10,
        sort: device.selectedSort,
        order: device.selectedOrder,
      }).then((data) => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      });
    } catch (e) {
      alert('Произошла ошибка при загрузке девайсов!');
      console.log(e);
    }
  }, []);

  const handleDelete = () => {
    setIsLoading(true);

    if (!selectedDevice) {
      alert('Выберите девайс!');
      return;
    }

    deleteDevice(selectedDevice.id)
      .then(() => {
        onClose();
      })
      .catch((e) => {
        alert('Произошла ошибка при удалении девайса!');
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <h2>Удалить девайс</h2>
      <div className={styles.form}>
        <Select
          options={device.devices}
          getOptionLabel={(device) => device.name}
          getOptionValue={(device) => device.id}
          onChange={(selectedOption) => setSelectedDevice(selectedOption)}
          placeholder="Выберите девайс для удаления!"
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

export default DeleteDevice;
