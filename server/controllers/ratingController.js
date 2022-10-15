const { Rating, Device } = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController {
  async create(req, res, next) {
    try {
      const { deviceId, userId, rate } = req.body;

      const rating = await Rating.findOne({ where: { deviceId, userId } });
      const ratings = await Rating.findAndCountAll({ where: { deviceId } });

      if (rating) {
        if (rating.rate === rate) {
          return next(ApiError.badRequest('You have already rated this device'));
        } else {
          await Rating.update({ rate }, { where: { deviceId, userId } });

          if (ratings.count !== 0) {
            let calcRating = rate;

            Promise.all(
              ratings.rows.map((item) => {
                calcRating += item.dataValues.rate;
              }),
            ).then(() => {
              calcRating = calcRating / (ratings.count + 1);
              try {
                Device.update({ rating: calcRating }, { where: { id: deviceId } });
              } catch (e) {
                next(ApiError.badRequest(e.message));
              }
            });
          }
          return res.json('rating updated');
        }
      } else {
        await Rating.create({ deviceId, userId, rate });
        return res.json('rating created');
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { deviceId } = req.body;
      const ratings = await Rating.findAndCountAll({
        where: { deviceId },
      });
      return res.json(ratings);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { deviceId, userId } = req.body;
      await Rating.destroy({ where: { deviceId, userId } });
      return res.json('rating deleted');
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new RatingController();
