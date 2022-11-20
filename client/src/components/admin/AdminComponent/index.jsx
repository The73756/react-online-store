import { useState } from 'react';
import CreateBrand from '../modals/CreateBrand';
import CreateDevice from '../modals/CreateDevice';
import CreateType from '../modals/CreateType';

import styles from './AdminComponent.module.scss';
import Button from '../../../theme/Button';
import DeleteType from '../modals/DeleteType';
import DeleteBrand from '../modals/DeleteBrand';
import DeleteDevice from '../modals/DeleteDevice';

const AdminComponent = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);

  const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);
  const [deleteBrandVisible, setDeleteBrandVisible] = useState(false);
  const [deleteDeviceVisible, setDeleteDeviceVisible] = useState(false);

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
        <div className={styles.btnGroup}>
          <Button
            variant="danger"
            onClick={() => setDeleteTypeVisible(true)}
            className={styles.btn}>
            Удалить тип
          </Button>
          <Button
            variant="danger"
            onClick={() => setDeleteBrandVisible(true)}
            className={styles.btn}>
            Удалить бренд
          </Button>

          <Button
            variant="danger"
            onClick={() => setDeleteDeviceVisible(true)}
            className={styles.btn}>
            Удалить девайс
          </Button>
        </div>
      </div>
      <CreateBrand opened={brandVisible} onClose={() => setBrandVisible(false)} />
      <CreateDevice opened={deviceVisible} onClose={() => setDeviceVisible(false)} />
      <CreateType opened={typeVisible} onClose={() => setTypeVisible(false)} />

      <DeleteType opened={deleteTypeVisible} onClose={() => setDeleteTypeVisible(false)} />
      <DeleteBrand opened={deleteBrandVisible} onClose={() => setDeleteBrandVisible(false)} />
      <DeleteDevice opened={deleteDeviceVisible} onClose={() => setDeleteDeviceVisible(false)} />
    </>
  );
};

export default AdminComponent;
