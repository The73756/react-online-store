const uuid = require('uuid');
const path = require('path');
require('multer');

const { Device, DeviceInfo, DevicePhoto, DeviceVariant } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const prevDevice = await Device.findOne({ where: { name } });
      const images = req.files;
      const imageNames = [];

      if (prevDevice) {
        return next(ApiError.badRequest('Device with this name already exists'));
      }

      if (!images) {
        return next(ApiError.badRequest('No images'));
      }

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
      });

      images.img.forEach((image) => {
        const fileName = uuid.v4() + '.jpg';
        image.mv(path.resolve(__dirname, '..', 'static', fileName));
        imageNames.push(fileName);
      });

      imageNames.forEach((imageName) => {
        DevicePhoto.create({
          url: imageName,
          deviceId: device.id,
        });
      });

      if (info) {
        info = JSON.parse(info);

        if (info.properties.length > 0) {
          info.properties.forEach((i) => {
            DeviceInfo.create({
              title: i.title,
              description: i.description,
              deviceId: device.id,
            });
          });
        }

        if (info.propertiesWithVariants.length > 0) {
          info.propertiesWithVariants.forEach((property) => {
            (async () => {
              const deviceInfo = await DeviceInfo.create({
                title: property.title,
                description: property.description,
                deviceId: device.id,
              });

              property.variants.forEach((variant) => {
                DeviceVariant.create({
                  value: variant.value,
                  cost: variant.cost,
                  additionalInfo: variant.additionalInfo,
                  deviceInfoId: deviceInfo.id,
                });
              });
            })();
          });
        }
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page, search, sort, order } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    search = search || '';
    let devices;

    if (!brandId && !typeId && !search) {
      devices = await Device.findAll({
        order: [[sort, order]],
        include: [{ model: DevicePhoto, as: 'photos' }],
        limit,
        offset,
      });
    }

    if (!brandId && !typeId && search) {
      devices = await Device.findAll({
        where: { name: { [Op.iRegexp]: search } },
        order: [[sort, order]],
        include: [{ model: DevicePhoto, as: 'photos' }],
        limit,
        offset,
      });
    }

    if (brandId && !typeId && !search) {
      devices = await Device.findAll({
        where: { brandId },
        order: [[sort, order]],
        include: [{ model: DevicePhoto, as: 'photos' }],
        limit,
        offset,
      });
    }

    if (brandId && !typeId && search) {
      devices = await Device.findAll({
        where: { brandId, name: { [Op.iRegexp]: search } },
        order: [[sort, order]],
        include: [{ model: DevicePhoto, as: 'photos' }],
        limit,
        offset,
      });
    }

    if (!brandId && typeId && !search) {
      devices = await Device.findAll({
        where: { typeId },
        order: [[sort, order]],
        include: [{ model: DevicePhoto, as: 'photos' }],
        limit,
        offset,
      });
    }

    if (!brandId && typeId && search) {
      devices = await Device.findAll({
        where: { typeId, name: { [Op.iRegexp]: search } },
        order: [[sort, order]],
        include: [{ model: DevicePhoto, as: 'photos' }],
        limit,
        offset,
      });
    }

    if (brandId && typeId && !search) {
      devices = await Device.findAll({
        where: { typeId, brandId },
        order: [[sort, order]],
        include: [{ model: DevicePhoto, as: 'photos' }],
        limit,
        offset,
      });
    }

    if (brandId && typeId && search) {
      devices = await Device.findAll({
        where: { typeId, brandId, name: { [Op.iRegexp]: search } },
        order: [[sort, order]],
        include: [{ model: DevicePhoto, as: 'photos' }],
        limit,
        offset,
      });
    }

    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [
        { model: DeviceInfo, as: 'info', include: [{ model: DeviceVariant, as: 'variants' }] },
        { model: DevicePhoto, as: 'photos' },
      ],
    });

    return res.json(device);
  }

  async delete(req, res, next) {
    try {
      const { id } = req.body;
      const device = await Device.findOne({ where: { id } });

      if (!device) {
        return next(ApiError.badRequest('Device not found'));
      } else {
        await Device.destroy({ where: { id } });
        return res.json('device deleted');
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new DeviceController();
