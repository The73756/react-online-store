const {
  BasketDevice,
  Device,
  DevicePhoto,
  Type,
  Brand,
  DeviceInfo,
  DeviceVariant,
} = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
  async create(req, res, next) {
    try {
      const { deviceId, basketId, deviceVariantId } = req.body;

      if (!deviceId || !basketId) {
        return next(ApiError.badRequest('deviceId or basketId not found'));
      }

      const basketDevice = await BasketDevice.create({
        deviceId,
        basketId,
        count: 1,
        deviceVariantId,
      });
      return res.json(basketDevice);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id, count } = req.body;
      const device = await BasketDevice.findOne({
        where: { id },
      });

      if (!device) {
        return next(ApiError.badRequest('Device not found'));
      } else {
        await BasketDevice.update({ count }, { where: { id } });
        return res.json('basket device count updated');
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { basketId } = req.query;

      const basketsDevices = await BasketDevice.findAll({
        where: { basketId },
        include: [
          {
            model: Device,
            include: [
              { model: DevicePhoto, as: 'photos' },
              { model: Type, as: 'type' },
              { model: Brand, as: 'brand' },
              {
                model: DeviceInfo,
                as: 'info',
                include: [{ model: DeviceVariant, as: 'variants' }],
              },
            ],
          },
        ],
      });
      return res.json(basketsDevices);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.query;

      if (!id) {
        return next(ApiError.badRequest('id not found'));
      }

      const device = await BasketDevice.findOne({
        where: { id },
      });

      if (!device) {
        return next(ApiError.badRequest('Basket device not found'));
      } else {
        await BasketDevice.destroy({
          where: { id },
        });
        return res.json('basket device deleted');
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BasketController();
