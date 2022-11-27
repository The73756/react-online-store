import styles from './SelectorItem.module.scss';
import Button from '../../../theme/Button';

const SelectorItem = ({ id, active, value, colorHex, onChange }) => {
  return (
    <li className={styles.root}>
      <Button className={styles.btn} active={active} onClick={() => onChange(id)}>
        {colorHex && (
          <span className={styles.colorHex} style={{ backgroundColor: colorHex }}></span>
        )}
        {value}
      </Button>
    </li>
  );
};

export default SelectorItem;
