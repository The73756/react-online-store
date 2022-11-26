const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, unique: true },
});

const BasketDevice = sequelize.define('basket_device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  basketId: { type: DataTypes.INTEGER },
  deviceId: { type: DataTypes.INTEGER },
  count: { type: DataTypes.INTEGER },
});

const BasketDeviceVariant = sequelize.define('basket_device_variant', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = sequelize.define('device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.DOUBLE, defaultValue: 0 },
  description: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.DOUBLE, allowNull: false },
  deviceId: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = sequelize.define('device_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  deviceId: { type: DataTypes.INTEGER, allowNull: false },
});

const DevicePhoto = sequelize.define('device_photo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
  deviceId: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceVariant = sequelize.define('device_variant', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING, allowNull: false },
  cost: { type: DataTypes.INTEGER, allowNull: false },
  additionalInfo: { type: DataTypes.STRING, allowNull: false },
  deviceInfoId: { type: DataTypes.INTEGER, allowNull: false },
  deviceId: { type: DataTypes.INTEGER, allowNull: false },
});

const TypeBrand = sequelize.define('type_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device, { onDelete: 'cascade' });

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: 'info' });
DeviceInfo.belongsTo(Device, { onDelete: 'cascade' });

Device.hasMany(DevicePhoto, { as: 'photos' });
DevicePhoto.belongsTo(Device, { onDelete: 'cascade' });

Device.hasMany(DeviceVariant, { as: 'variants' });
DeviceVariant.belongsTo(Device, { onDelete: 'cascade' });

DeviceInfo.hasMany(DeviceVariant, { as: 'variants' });
DeviceVariant.belongsTo(DeviceInfo, { onDelete: 'cascade' });

BasketDevice.hasMany(BasketDeviceVariant, { as: 'variants' });
BasketDeviceVariant.belongsTo(BasketDevice, { onDelete: 'cascade' });

DeviceVariant.hasMany(BasketDeviceVariant);
BasketDeviceVariant.belongsTo(DeviceVariant);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
  User,
  Basket,
  BasketDevice,
  BasketDeviceVariant,
  Device,
  Type,
  Brand,
  Rating,
  TypeBrand,
  DeviceInfo,
  DevicePhoto,
  DeviceVariant,
};
