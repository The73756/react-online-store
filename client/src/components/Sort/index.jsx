import Select from 'react-select';
import { useContext, useState } from 'react';
import { SORT } from '../../utils/consts';
import { Context } from '../../index';
import Button from '../../theme/Button';
import { observer } from 'mobx-react-lite';

import styles from './Sort.module.scss';

const options = [
  { value: SORT.RATING, label: 'По рейтингу' },
  { value: SORT.PRICE, label: 'По цене' },
  { value: SORT.NAME, label: 'По названию' },
  { value: SORT.TYPE, label: 'По типу' },
  { value: SORT.BRAND, label: 'По бренду' },
];

const Sort = observer(({ isLoading }) => {
  const { device } = useContext(Context);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const onChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    device.setSelectedSort(selectedOption.value);
  };

  const onOrderChange = () => {
    device.setSelectedOrder(device.selectedOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h3 className={styles.title}>Сортировка:</h3>
        <Button onClick={onOrderChange} disabled={isLoading}>
          {device.selectedOrder}
        </Button>
      </div>

      <Select
        className={styles.sort}
        defaultValue={selectedOption}
        onChange={onChange}
        options={options}
        isDisabled={isLoading}
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary25: '#ccc',
            primary: '#2f2f2fff',
          },
        })}
      />
    </div>
  );
});

export default Sort;
