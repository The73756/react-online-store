import styles from './SelectorItem.module.scss';
import Button from '../../../theme/Button';

const SelectorItem = ({ id, value, cost, additionalInfo, onChange }) => {
  return (
    <li className={styles.root}>
      {additionalInfo && <div className={styles.additionalInfo}>{additionalInfo}</div>}
      <Button onChange={() => onChange(id)}>{value}</Button>
    </li>
  );
};

export default SelectorItem;
