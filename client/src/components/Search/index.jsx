import styles from './Search.module.scss';
import { useContext, useState } from 'react';
import { Context } from '../../index';
import useDebounce from '../../hooks/useDebounce';
import SearchSvgSelector from './SearchSvgSelector';
import Button from '../../theme/Button';

const Search = () => {
  const { device } = useContext(Context);
  const [searchValue, setSearchValue] = useState('');
  const [warning, setWarning] = useState(false);
  const setDeviceSearch = (value) => {
    device.setSearch(value);
  };
  const debouncedSearchValue = useDebounce(setDeviceSearch, 400);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    debouncedSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (!searchValue) {
      setWarning(true);
      return;
    }
    setDeviceSearch(searchValue);
    setWarning(false);
  };

  const handleClear = () => {
    setSearchValue('');
    setDeviceSearch('');
    setWarning(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Button onClick={handleSearch} className={styles.searchBtn} hover={false}>
          <SearchSvgSelector name={'search'} />
        </Button>
        <input
          className={`${styles.input} ${warning ? styles.warning : ''}`}
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder={'Введите название устройства'}
        />
        {searchValue && (
          <Button
            onClick={handleClear}
            className={`${styles.searchBtn} ${styles.closeBtn}`}
            hover={false}>
            <SearchSvgSelector name={'close'} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Search;
