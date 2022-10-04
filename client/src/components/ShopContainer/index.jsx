import styles from './ShopContainer.module.scss';

const ShopContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default ShopContainer;
