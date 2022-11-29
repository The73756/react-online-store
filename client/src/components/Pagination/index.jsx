import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import Button from '../../theme/Button';
import PaginationLoader from './PaginationLoader';
import styles from './Pagination.module.scss';

const Pagination = observer(({ isLoading }) => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];
  const skeletons = [...new Array(3)].map((_, index) => <PaginationLoader key={index} />);

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <div className={styles.container}>
      {isLoading
        ? skeletons
        : pages.map((page) => (
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
