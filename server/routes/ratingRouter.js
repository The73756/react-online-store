const Router = require('express');
const router = new Router();
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, ratingController.create);
router.get('/', authMiddleware, ratingController.getAllByUser);
router.delete('/', authMiddleware, ratingController.delete);

module.exports = router;
