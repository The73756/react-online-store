import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceApi";
import Modal from "../Modal";
import styles from "./modals.module.scss";

const CreateDevice = observer(({ opened, onClose }) => {
  const { device } = useContext(Context);

  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);

  const [isDdTypeOpen, setIsDdTypeOpen] = useState(false);
  const [isDdBrandOpen, setIsDdBrandOpen] = useState(false);

  useEffect(() => {
    try {
      fetchTypes().then((data) => device.setTypes(data));
      fetchBrands().then((data) => device.setBrands(data));
    } catch (error) {
      console.log(error);
      alert("Ошибка при загрузке классификаций (типов/брендов)"); // TODO: доделать лоадер и обработку ошибок
    }
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addDeivce = (e) => {
    const formData = new FormData();
    e.preventDefault();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then(() => {
      onClose();
    });
  };

  return (
    // TODO: декомпозировать эту биг штуку
    <Modal opened={opened} onClose={onClose}>
      <form action="" className={styles.form} onSubmit={addDeivce}>
        <div className={styles.top}>
          <div>
            <button
              type="button"
              className={styles.btn}
              onClick={() => setIsDdTypeOpen(!isDdTypeOpen)}
            >
              {device.selectedType.name || "Выберите тип"}
            </button>
            <ul
              style={{ display: isDdTypeOpen ? "block" : "none" }}
              className={styles.list}
            >
              {device.types.map((type) => (
                <li key={type.id} className={styles.listItem}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.listBtn}`}
                    onClick={() => device.setSelectedType(type)}
                  >
                    {type.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button
              type="button"
              className={styles.btn}
              onClick={() => setIsDdBrandOpen(!isDdBrandOpen)}
            >
              {device.selectedBrand.name || "Выберите бренд"}
            </button>
            <ul
              style={{ display: isDdBrandOpen ? "block" : "none" }}
              className={styles.list}
            >
              {device.brands.map((brand) => (
                <li key={brand.id} className={styles.listItem}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.listBtn}`}
                    onClick={() => device.setSelectedBrand(brand)}
                  >
                    {brand.name}
                  </button>
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
          <input className={styles.input} type="file" onChange={selectFile} />
        </div>

        <button type="button" className={styles.btn} onClick={addInfo}>
          Добавить новое свойство
        </button>

        <div className={styles.infoBlock}>
          {info.map((item) => (
            <div className={styles.infoBlockItem} key={item.number}>
              <input
                type="text"
                className={styles.input}
                placeholder="Введите название свойства"
                value={item.title}
                onChange={(e) =>
                  changeInfo("title", e.target.value, item.number)
                }
              />
              <input
                type="text"
                className={styles.input}
                placeholder="Введите описание свойства"
                value={item.description}
                onChange={(e) =>
                  changeInfo("description", e.target.value, item.number)
                }
              />
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => removeInfo(item.number)}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <button type="submit" className={styles.btn}>
            Добавить
          </button>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            Закрыть
          </button>
        </div>
      </form>
    </Modal>
  );
});
export default CreateDevice;
