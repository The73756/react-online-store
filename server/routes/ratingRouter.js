const Router = require('express');
const router = new Router();
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', ratingController.create); // authMiddleware,
router.get('/', ratingController.getAll);
router.delete('/', ratingController.delete); // authMiddleware,

module.exports = router;
