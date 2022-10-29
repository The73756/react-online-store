import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import styles from './Pagination.module.scss';

const Pagination = observer(() => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <div className={styles.container}>
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.page} ${device.page === page ? styles.active : ''}`}
          onClick={() => device.setPage(page)}>
          {page}
        </button>
      ))}
    </div>
  );
});

export default Pagination;
