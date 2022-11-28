import Modal from '../../components/Modal';
import styles from './AlertModal.module.scss';
import Button from '../Button';

const AlertModal = ({ title, desc, opened, onClose, children }) => {
  return (
    <Modal onClose={onClose} opened={opened}>
      <div className={styles.root}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{desc}</p>
        <div className={styles.children}>{children}</div>
        <Button variant="danger" onClick={onClose} className={styles.btn}>
          Закрыть
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
