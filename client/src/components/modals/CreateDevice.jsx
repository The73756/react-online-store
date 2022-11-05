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
  const [infoWithVar, setInfoWithVar] = useState([]);

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

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const addInfoWithVar = () => {
    setInfoWithVar([
      ...infoWithVar,
      {
        title: '',
        description: '',
        variants: [{ value: '', cost: '', additionalInfo: '', number: Date.now() }],
        number: Date.now(),
      },
    ]);
  };

  const setInfoVariant = (number) => {
    const item = infoWithVar.find((i) => i.number === number);

    item.variants.push({ value: '', cost: '', additionalInfo: '', number: Date.now() });
    setInfoWithVar([...infoWithVar]);
  };

  const removeInfoVariant = (number) => {
    const item = infoWithVar.find((i) => i.number === number);
    item.variants.pop();
    setInfoWithVar([...infoWithVar]);
  };

  const updateInfoVariant = (key, value, infoNumber, variantNumber) => {
    const item = infoWithVar.find((i) => i.number === infoNumber);
    const variant = item.variants.find((i) => i.number === variantNumber);

    variant[key] = value;
    setInfoWithVar([...infoWithVar]);
  };

  const removeInfoWithVar = (number) => {
    setInfoWithVar(infoWithVar.filter((i) => i.number !== number));
  };

  const changeInfoWithVar = (key, value, number) => {
    setInfoWithVar(infoWithVar.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const selectFile = (e) => {
    setFiles(e.target.files);
  };

  const addDevice = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const total = {
      properties: info,
      propertiesWithVariants: infoWithVar,
    };

    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('brandId', device.selectedBrand.id);
    formData.append('typeId', device.selectedType.id);
    formData.append('info', JSON.stringify(total));

    for (let i = 0; i < files.length; i++) {
      formData.append('img', files[i]);
    }

    createDevice(formData).then(() => {
      onClose();
    });

    console.log(total);
  };

  return (
    // TODO: декомпозировать эту биг штуку!!!!! прям надо

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

        <div className={styles.buttons}>
          <Button onClick={addInfo}>Добавить новое свойство</Button>
          <Button onClick={addInfoWithVar}>Добавить свойство с вариантами</Button>
        </div>

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

        <div>
          {infoWithVar.map((item) => (
            <div
              className={`${styles.infoBlockItem} ${styles.infoWidthVarBlock}`}
              key={item.number}>
              <div className={styles.infoWithVarItems}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Введите название свойства"
                  value={item.title}
                  onChange={(e) => changeInfoWithVar('title', e.target.value, item.number)}
                />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Введите описание свойства"
                  value={item.description}
                  onChange={(e) => changeInfoWithVar('description', e.target.value, item.number)}
                />
                <Button variant="danger" onClick={() => removeInfoWithVar(item.number)}>
                  Удалить свойство
                </Button>
              </div>

              <div className={styles.variantWrapper}>
                Введите варианты:
                <Button onClick={() => setInfoVariant(item.number)}>Добавить вариант</Button>
                {item.variants.map((obj) => (
                  <div key={obj.number} className={styles.variants}>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Введите значение"
                      value={item.variants.value}
                      onChange={(e) =>
                        updateInfoVariant('value', e.target.value, item.number, obj.number)
                      }
                    />
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Введите цену при этом значении"
                      value={item.variants.cost}
                      onChange={(e) =>
                        updateInfoVariant('cost', e.target.value, item.number, obj.number)
                      }
                    />
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Введите дополнение к нему"
                      value={item.variants.additionalInfo}
                      onChange={(e) =>
                        updateInfoVariant('additionalInfo', e.target.value, item.number, obj.number)
                      }
                    />
                    <Button variant="danger" onClick={() => removeInfoVariant(item.number)}>
                      Удалить вариант
                    </Button>
                  </div>
                ))}
              </div>
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
