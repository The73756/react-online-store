import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../..";
import DeviceItem from "../DeviceItem";
import styles from "./DevicesList.module.scss";

const DevicesList = observer(() => {
  const { device, basket } = useContext(Context);

  const getTypeName = (id) => {
    const type = device.types.find((type) => type.id === id);
    return type.name;
  };

  const getBrandName = (id) => {
    const brand = device.brands.find((brand) => brand.id === id);
    return brand.name;
  };

  return (
    <main className={styles.container}>
      {device.devices.map((device) => (
        <DeviceItem
          key={device.id}
          {...device}
          isAdded={basket.basketDevices.some((item) => item.id === device.id)}
          type={getTypeName(device.typeId)}
          brand={getBrandName(device.brandId)}
        />
      ))}
    </main>
  );
});

export default DevicesList;
