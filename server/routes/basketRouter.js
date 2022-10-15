const Router = require('express');
const router = new Router();
const basketController = require('../controllers/BasketController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, basketController.create);
router.delete('/', authMiddleware, basketController.delete);
router.get('/', authMiddleware, basketController.getAll);
// router.get('/:id', basketController.getOne);
router.put('/', authMiddleware, basketController.update);

module.exports = router;
