import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceApi';
import Modal from '../Modal';
import styles from './modals.module.scss';
import Button from '../../theme/Button';

const CreateDevice = observer(({ opened, onClose }) => {
  const { device } = useContext(Context);

  const [info, setInfo] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [files, setFiles] = useState(null);

  const [isDdTypeOpen, setIsDdTypeOpen] = useState(false);
  const [isDdBrandOpen, setIsDdBrandOpen] = useState(false);

  useEffect(() => {
    try {
      fetchTypes().then((data) => device.setTypes(data));
      fetchBrands().then((data) => device.setBrands(data));
    } catch (error) {
      console.log(error);
      alert('Ошибка при загрузке классификаций (типов/брендов)'); // TODO: доделать лоадер и обработку ошибок
    }
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const selectFile = (e) => {
    setFiles(e.target.files);
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const addDevice = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('brandId', device.selectedBrand.id);
    formData.append('typeId', device.selectedType.id);
    formData.append('info', JSON.stringify(info));

    for (let i = 0; i < files.length; i++) {
      formData.append('img', files[i]);
    }

    createDevice(formData).then(() => {
      onClose();
    });
  };

  return (
    // TODO: декомпозировать эту биг штуку
    <Modal opened={opened} onClose={onClose}>
      <form className={styles.form} onSubmit={addDevice}>
        <div className={styles.top}>
          <div>
            <Button className={styles.btn} onClick={() => setIsDdTypeOpen(!isDdTypeOpen)}>
              {device.selectedType.name || 'Выберите тип'}
            </Button>
            <ul style={{ display: isDdTypeOpen ? 'block' : 'none' }} className={styles.list}>
              {device.types.map((type) => (
                <li key={type.id} className={styles.listItem}>
                  <Button className={styles.listBtn} onClick={() => device.setSelectedType(type)}>
                    {type.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Button onClick={() => setIsDdBrandOpen(!isDdBrandOpen)}>
              {device.selectedBrand.name || 'Выберите бренд'}
            </Button>
            <ul style={{ display: isDdBrandOpen ? 'block' : 'none' }} className={styles.list}>
              {device.brands.map((brand) => (
                <li key={brand.id} className={styles.listItem}>
                  <Button className={styles.listBtn} onClick={() => device.setSelectedBrand(brand)}>
                    {brand.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.inputsBlock}>
          <input
            className={styles.input}
            type="text"
            placeholder="Введите название устройства"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.input}
            type="number"
            placeholder="Введите стоимость устройства"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <input className={styles.input} type="file" multiple={true} onChange={selectFile} />
        </div>

        <Button onClick={addInfo}>Добавить новое свойство</Button>

        <div className={styles.infoBlock}>
          {info.map((item) => (
            <div className={styles.infoBlockItem} key={item.number}>
              <input
                type="text"
                className={styles.input}
                placeholder="Введите название свойства"
                value={item.title}
                onChange={(e) => changeInfo('title', e.target.value, item.number)}
              />
              <input
                type="text"
                className={styles.input}
                placeholder="Введите описание свойства"
                value={item.description}
                onChange={(e) => changeInfo('description', e.target.value, item.number)}
              />
              <Button variant="danger" onClick={() => removeInfo(item.number)}>
                Удалить
              </Button>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <Button type="submit">Добавить</Button>
          <Button variant="danger" className={styles.closeBtn} onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </form>
    </Modal>
  );
});
export default CreateDevice;
