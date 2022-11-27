import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../../index';
import { createDevice, fetchBrands, fetchTypes } from '../../../http/deviceApi';
import Modal from '../../Modal';
import styles from './modals.module.scss';
import Button from '../../../theme/Button';
import DeviceMetaSelect from '../DeviceMetaSelect';
import DeviceInfoBlock from '../DeviceInfoBlock';
import Input from '../../../theme/Input';
import Textarea from '../../../theme/Textarea';

const CreateDevice = observer(({ opened, onClose }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [infoWithVar, setInfoWithVar] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(0);
  const [files, setFiles] = useState(null);

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
        variants: [{ value: '', cost: '', colorHex: '', number: Date.now() }],
        number: Date.now(),
      },
    ]);
  };

  const setInfoVariant = (number) => {
    const item = infoWithVar.find((i) => i.number === number);

    item.variants.push({ value: '', cost: '', colorHex: '', number: Date.now() });
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

    if (!device.selectedBrand.id || !device.selectedType.id) {
      alert('Выберите бренд и тип');
      return;
    }

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
    formData.append('description', desc);

    for (let i = 0; i < files.length; i++) {
      formData.append('img', files[i]);
    }

    createDevice(formData).then(() => {
      onClose();
    });
  };

  return (
    // TODO: декомпозировать эту биг штуку!!!!! прям надо

    <Modal opened={opened} onClose={onClose}>
      <h2>Добавить девайс</h2>
      <form className={styles.form} onSubmit={addDevice}>
        <DeviceMetaSelect />

        <div className={styles.inputsBlock}>
          <Input
            placeholder="Введите название устройства"
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Введите стоимость устройства"
            required={true}
            value={price || ''}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className={styles.input}
            required={true}
            placeholder="Введите описание устройства"
            style={{ resize: 'vertical' }}
          />
          <Input type="file" multiple={true} onChange={selectFile} required={true} />
        </div>

        <div className={styles.buttons}>
          <Button onClick={addInfo}>Добавить новое свойство</Button>
          <Button onClick={addInfoWithVar}>Добавить свойство с вариантами</Button>
        </div>

        <div className={styles.infoBlock}>
          {info.map((item) => (
            <DeviceInfoBlock
              key={item.number}
              {...item}
              changeInfo={changeInfo}
              removeInfo={removeInfo}
            />
          ))}
        </div>

        <div>
          {infoWithVar.map((item) => (
            <div
              className={`${styles.infoBlockItem} ${styles.infoWidthVarBlock}`}
              key={item.number}>
              <div className={styles.infoWithVarItems}>
                <Input
                  placeholder="Введите название свойства"
                  required={true}
                  value={item.title}
                  onChange={(e) => changeInfoWithVar('title', e.target.value, item.number)}
                />
                <Input
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
                    <Input
                      placeholder="Введите значение"
                      required={true}
                      value={item.variants.value}
                      onChange={(e) =>
                        updateInfoVariant('value', e.target.value, item.number, obj.number)
                      }
                    />
                    <Input
                      placeholder="Введите наценку этого варианта"
                      required={true}
                      value={item.variants.cost}
                      onChange={(e) =>
                        updateInfoVariant('cost', e.target.value, item.number, obj.number)
                      }
                    />
                    <Input
                      placeholder="Введите цвет в формате rgb, hex, etc (необ.)"
                      value={item.variants.colorHex}
                      onChange={(e) =>
                        updateInfoVariant('colorHex', e.target.value, item.number, obj.number)
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
