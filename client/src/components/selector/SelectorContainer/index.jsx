import { useEffect, useState } from 'react';
import styles from './SelectorContainer.module.scss';
import SelectorItem from '../SelectorItem';

const SelectorContainer = ({
  variants,
  infoId,
  setGlobalState,
  title,
  price,
  setPrice,
  className,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0].id);

  useEffect(() => {
    setPrice(+price + variants.find((variant) => variant.id === selectedVariant).cost);
  }, []);

  const onChange = (id) => {
    const variant = variants.find((variant) => variant.id === id);

    setSelectedVariant(id);
    setGlobalState(infoId, id);
    setPrice(price + variant.cost);
  };

  return (
    <div className={`${styles.root} ${className}`}>
      {title && <h3 className={styles.title}>{title}:</h3>}
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
