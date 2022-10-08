import { useState } from 'react';
import CreateBrand from '../modals/CreateBrand';
import CreateDevice from '../modals/CreateDevice';
import CreateType from '../modals/CreateType';

import styles from './AdminComponent.module.scss';

const AdminComponent = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        <button onClick={() => setBrandVisible(true)} className={styles.btn}>
          Добавить бренд
        </button>
        <button onClick={() => setDeviceVisible(true)} className={styles.btn}>
          Добавить девайс
        </button>
        <button onClick={() => setTypeVisible(true)} className={styles.btn}>
          Добавить тип
        </button>
      </div>
      <CreateBrand opened={brandVisible} onClose={() => setBrandVisible(false)} />
      <CreateDevice opened={deviceVisible} onClose={() => setDeviceVisible(false)} />
      <CreateType opened={typeVisible} onClose={() => setTypeVisible(false)} />
    </>
  );
};

export default AdminComponent;
