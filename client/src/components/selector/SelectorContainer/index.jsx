import { useState } from 'react';
import styles from './SelectorContainer.module.scss';
import SelectorItem from '../SelectorItem';

const SelectorContainer = ({ variants, infoId, setGlobalState, setPrice }) => {
  /*variant [{id: 1, value: "name", cost: 42323, additionalInfo: "biba"}] */
  const [selectedVariant, setSelectedVariant] = useState(null);

  const onChange = (id) => {
    setSelectedVariant(id);
    setGlobalState(infoId, id);
    // setPrice(variants[id].cost);
  };

  console.log(selectedVariant);

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
