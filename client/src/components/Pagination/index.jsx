import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import styles from './Pagination.module.scss';
import Button from '../../theme/Button';

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
        <Button
          key={page}
          className={`${styles.btn} ${device.page === page ? styles.active : ''}`}
          onClick={() => device.setPage(page)}>
          {page}
        </Button>
      ))}
    </div>
  );
});

export default Pagination;
