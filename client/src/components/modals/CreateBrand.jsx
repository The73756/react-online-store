import Modal from '../Modal';
import styles from './modals.module.scss';

const CreateBrand = ({ opened, onClose }) => {
  return (
    <Modal opened={opened} onClose={onClose}>
      <form action='' className={styles.form}>
        <div className={styles.inputsBlock}>
          <input className={styles.input} type='text' placeholder='Введите название бренда>' />
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

export default CreateBrand;
