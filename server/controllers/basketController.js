const { BasketDevice, Device } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
  async create(req, res, next) {
    try {
      const { deviceId, basketId } = req.body;

      if (!deviceId || !basketId) {
        return next(ApiError.badRequest('deviceId or basketId not found'));
      }

      const basketdevice = await BasketDevice.create({ deviceId, basketId, count: 1 });
      return res.json(basketdevice);
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

  // ? получение одного ваще надо не? все равно же на страницу одного девайса переходить
  // async getOne(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const basketinfo = await BasketDevice.findOne({
  //       where: { id },
  //     });
  //     return res.json(basketinfo);
  //   } catch (e) {
  //     next(ApiError.badRequest(e.message));
  //   }
  // }

  async getAll(req, res, next) {
    try {
      const { basketId } = req.query;
      const basketsDevices = await BasketDevice.findAll({
        where: { basketId },
      });
      const devices = [];
      const response = {};

      Promise.all(
        basketsDevices.map(async (item) => {
          const device = await Device.findOne({
            where: { id: item.deviceId },
          });
          if (device) {
            devices.push({ ...device.dataValues, count: item.count });
          }
        }),
      ).then(() => {
        response.rows = devices;
        response.count = devices.length;
        return res.json(response);
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { deviceId, basketId } = req.query;

      if (!deviceId || !basketId) {
        console.log(req.query);
        return next(ApiError.badRequest('deviceId or basketId not found'));
      }

      const device = await BasketDevice.findOne({
        where: { deviceId, basketId },
      });

      if (!device) {
        return next(ApiError.badRequest('Basket device not found'));
      } else {
        await BasketDevice.destroy({
          where: { deviceId, basketId },
        });
        return res.json('basket device deleted');
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BasketController();
