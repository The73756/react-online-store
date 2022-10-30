import { useState } from 'react';
import CreateBrand from '../modals/CreateBrand';
import CreateDevice from '../modals/CreateDevice';
import CreateType from '../modals/CreateType';

import styles from './AdminComponent.module.scss';
import Button from '../../theme/Button';

const AdminComponent = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        <Button onClick={() => setBrandVisible(true)} className={styles.btn}>
          Добавить бренд
        </Button>
        <Button onClick={() => setDeviceVisible(true)} className={styles.btn}>
          Добавить девайс
        </Button>
        <Button onClick={() => setTypeVisible(true)} className={styles.btn}>
          Добавить тип
        </Button>
      </div>
      <CreateBrand opened={brandVisible} onClose={() => setBrandVisible(false)} />
      <CreateDevice opened={deviceVisible} onClose={() => setDeviceVisible(false)} />
      <CreateType opened={typeVisible} onClose={() => setTypeVisible(false)} />
    </>
  );
};

export default AdminComponent;
