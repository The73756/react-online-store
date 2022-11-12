import styles from './SelectorItem.module.scss';
import Button from '../../../theme/Button';

const SelectorItem = ({ id, active, value, cost, additionalInfo, onChange }) => {
  return (
    <li className={styles.root}>
      {additionalInfo && <div className={styles.additionalInfo}>{additionalInfo}</div>}
      <Button active={active} onClick={() => onChange(id)}>
        {value}
      </Button>
    </li>
  );
};

export default SelectorItem;
