import Button from '../../../theme/Button';
import styles from './DeviceInfoBlock.module.scss';

const DeviceInfoBlock = ({ title, description, number, changeInfo, removeInfo }) => {
  return (
    <div className={styles.infoBlockItem} key={number}>
      <input
        type="text"
        className={styles.input}
        placeholder="Введите название свойства"
        value={title}
        onChange={(e) => changeInfo('title', e.target.value, number)}
      />
      <input
        type="text"
        className={styles.input}
        placeholder="Введите описание свойства"
        value={description}
        onChange={(e) => changeInfo('description', e.target.value, number)}
      />
      <Button variant="danger" onClick={() => removeInfo(number)}>
        Удалить
      </Button>
    </div>
  );
};

export default DeviceInfoBlock;
