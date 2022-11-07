const { Rating, Device, DevicePhoto, Type, Brand } = require('../models/models');
const ApiError = require('../error/ApiError');

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
      const ratings = await Rating.findAndCountAll({ where: { deviceId } });

      if (+ratings.count !== 0) {
        let calcRating = 0;

        Promise.all(
          ratings.rows.map((item) => {
            calcRating += Number(item.dataValues.rate);
          }),
        ).then(() => {
          calcRating = calcRating / ratings.count;
          try {
            Device.update({ rating: calcRating }, { where: { id: deviceId } });
          } catch (e) {
            next(ApiError.badRequest(e.message));
          }
        });
        return res.json({
          newRating: calcRating / ratings.count,
          message: 'Rating saved',
        });
      }
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
      const { id } = req.query;
      await Rating.destroy({ where: { id } });
      return res.json('rating deleted');
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new RatingController();
