import { useState } from 'react';
import styles from './SelectorContainer.module.scss';
import SelectorItem from '../SelectorItem';

const SelectorContainer = ({ variants, setGlobalState, setPrice }) => {
  /*variant [{id: 1, value: "name", cost: 42323, additionalInfo: "biba"}] */
  const [selectedVariant, setSelectedVariant] = useState(0);

  const onChange = (id) => {
    setSelectedVariant(id);
    setGlobalState(id);
    setPrice(variants[id].cost);
  };

  return (
    <div className={styles.root}>
      <ul>
        {variants.map((variant) => (
          <SelectorItem key={variant.id} {...variant} onChange={onChange} />
        ))}
      </ul>
    </div>
  );
};

export default SelectorContainer;
