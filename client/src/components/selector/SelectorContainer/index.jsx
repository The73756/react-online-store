import { useState } from 'react';
import styles from './SelectorContainer.module.scss';
import SelectorItem from '../SelectorItem';

const SelectorContainer = ({ variants, infoId, setGlobalState, setPrice }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0].id);

  const onChange = (id) => {
    setSelectedVariant(id);
    setGlobalState(infoId, id);
    // setPrice(variants[id].cost);
  };

  return (
    <div className={styles.root}>
      <ul>
        {variants.map((variant) => (
          <SelectorItem
            key={variant.id}
            {...variant}
            active={selectedVariant === variant.id}
            onChange={onChange}
          />
        ))}
      </ul>
    </div>
  );
};

export default SelectorContainer;
