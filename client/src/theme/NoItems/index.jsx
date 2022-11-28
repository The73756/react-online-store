import styles from './NoItems.module.scss';

const NoItems = ({ title, desc }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
};

export default NoItems;
