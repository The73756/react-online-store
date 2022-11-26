const { Rating, Device, DevicePhoto, Type, Brand } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Sequelize } = require('sequelize');

const updateRating = async (deviceId) => {
  const avgRating = await Rating.findAll({
    where: { deviceId },
    attributes: [[Sequelize.fn('AVG', Sequelize.col('rate')), 'avgRating']],
  });

  const result = avgRating.map((r) => r.get('avgRating'))[0];
  const newRating = result ? result : 0;

  Device.update({ rating: newRating }, { where: { id: deviceId } });

  return {
    newRating: newRating,
    message: 'Rating saved',
  };
};

class RatingController {
  async create(req, res, next) {
    try {
      const { deviceId, userId, rate } = req.body;
      const numberRate = Number(rate);
      const rating = await Rating.findOne({ where: { deviceId, userId } });

      if (rating) {
        if (Number(rating.rate) === numberRate) {
          return res.json('You have already rated this device');
        } else {
          await Rating.update({ rate }, { where: { deviceId, userId } });
        }
      } else {
        await Rating.create({ deviceId, userId, rate });
      }
      const result = await updateRating(deviceId);
      return res.json(result);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllByUser(req, res, next) {
    try {
      const { userId } = req.query;
      const ratings = await Rating.findAll({
        where: { userId },
        include: [
          {
            model: Device,
            include: [
              { model: DevicePhoto, as: 'photos' },
              { model: Type, as: 'type' },
              { model: Brand, as: 'brand' },
            ],
          },
        ],
      });
      return res.json(ratings);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { userId, deviceId } = req.params;
      const rating = await Rating.findOne({
        where: { userId, deviceId },
      });
      if (rating) {
        return res.json(rating);
      } else {
        return res.json(null);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id, deviceId } = req.query;
      await Rating.destroy({ where: { id } });
      const result = await updateRating(deviceId);
      return res.json(result);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new RatingController();
