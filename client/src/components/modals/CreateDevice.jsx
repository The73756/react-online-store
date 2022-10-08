import { useContext, useState } from 'react';
import { Context } from '../..';
import Modal from '../Modal';
import styles from './modals.module.scss';

const CreateDevice = ({ opened, onClose }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [isDdTypeOpen, setIsDdTypeOpen] = useState(false);
  const [isDdBrandOpen, setIsDdBrandOpen] = useState(false);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <form action='' className={styles.form}>
        <div className={styles.top}>
          <div>
            <button
              type='button'
              className={styles.btn}
              onClick={() => setIsDdTypeOpen(!isDdTypeOpen)}>
              Выберите тип
            </button>
            <ul style={{ display: isDdTypeOpen ? 'block' : 'none' }} className={styles.list}>
              {device.types.map((type) => (
                <li key={type.id} className={styles.listItem}>
                  <button type='button' className={`${styles.btn} ${styles.listBtn}`}>
                    {type.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button
              type='button'
              className={styles.btn}
              onClick={() => setIsDdBrandOpen(!isDdBrandOpen)}>
              Выберите бренд
            </button>
            <ul style={{ display: isDdBrandOpen ? 'block' : 'none' }} className={styles.list}>
              {device.brands.map((brand) => (
                <li key={brand.id} className={styles.listItem}>
                  <button type='button' className={`${styles.btn} ${styles.listBtn}`}>
                    {brand.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.inputsBlock}>
          <input className={styles.input} type='text' placeholder='Введите название устройства' />
          <input
            className={styles.input}
            type='number'
            placeholder='Введите стоимость устройства'
          />
          <input className={styles.input} type='file' />
        </div>

        <button type='button' className={styles.btn} onClick={addInfo}>
          Добавить новое свойство
        </button>

        <div className={styles.infoBlock}>
          {info.map((item) => (
            <div className={styles.infoBlockItem} key={item.number}>
              <input type='text' className={styles.input} placeholder='Введите название свойства' />
              <input type='text' className={styles.input} placeholder='Введите описание свойства' />
              <button
                type='button'
                className={styles.closeBtn}
                onClick={() => removeInfo(item.number)}>
                Удалить
              </button>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <button type='submit' className={styles.btn}>
            Добавить
          </button>
          <button type='button' className={styles.closeBtn} onClick={onClose}>
            Закрыть
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default CreateDevice;
