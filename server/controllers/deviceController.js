const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const prevDevice = await Device.findOne({ where: { name } });

      if (prevDevice) {
        return next(ApiError.badRequest('Device with this name already exists'));
      }

      const { img } = req.files;
      let fileName = uuid.v4() + '.jpg';
      await img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          }),
        );
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
      devices = await Device.findAndCountAll({ order: [[sort, order]], limit, offset });
    }

    if (!brandId && !typeId && search) {
      devices = await Device.findAndCountAll({
        order: [[sort, order]],
        where: { name: { [Op.iRegexp]: search } },
        limit,
        offset,
      });
    }

    if (brandId && !typeId && !search) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        order: [[sort, order]],
        limit,
        offset,
      });
    }

    if (brandId && !typeId && search) {
      devices = await Device.findAndCountAll({
        where: { brandId, name: { [Op.iRegexp]: search } },
        order: [[sort, order]],
        limit,
        offset,
      });
    }

    if (!brandId && typeId && !search) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        order: [[sort, order]],
        limit,
        offset,
      });
    }

    if (!brandId && typeId && search) {
      devices = await Device.findAndCountAll({
        where: { typeId, name: { [Op.iRegexp]: search } },
        order: [[sort, order]],
        limit,
        offset,
      });
    }

    if (brandId && typeId && !search) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        order: [[sort, order]],
        limit,
        offset,
      });
    }

    if (brandId && typeId && search) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId, name: { [Op.iRegexp]: search } },
        order: [[sort, order]],
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
      include: [{ model: DeviceInfo, as: 'info' }],
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
