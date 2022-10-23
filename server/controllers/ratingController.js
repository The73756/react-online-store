const { Rating, Device } = require('../models/models');
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
          const ratings = await Rating.findAndCountAll({ where: { deviceId } });

          if (ratings.count !== 0) {
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
            return res.json({ newRating: calcRating / ratings.count, message: 'Rating updated' });
          } else {
            return res.json({ newRating: undefined, message: 'Rating updated' });
          }
        }
      } else {
        await Rating.create({ deviceId, userId, rate });
        const ratings = await Rating.findAndCountAll({ where: { deviceId } });

        if (ratings.count !== 0) {
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
          return res.json({ newRating: calcRating / ratings.count, message: 'Rating created' });
        } else {
          return res.json({ newRating: undefined, message: 'Rating created' });
        }
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // ? Такое нужно вообще?
  // async getAll(req, res, next) {
  //   try {
  //     const { deviceId } = req.body;
  //     const ratings = await Rating.findAndCountAll({
  //       where: { deviceId },
  //     });
  //     return res.json(ratings);
  //   } catch (e) {
  //     next(ApiError.badRequest(e.message));
  //   }
  // }

  getAllByUser(req, res, next) {
    try {
      const { userId } = req.body;
      const ratings = Rating.findAll({ where: { userId } });
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
