const Router = require('express');
const router = new Router();
const basketController = require('../controllers/BasketController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', basketController.create);
router.delete('/', basketController.delete);
router.get('/', basketController.getAll);
// router.get('/:id', basketController.getOne);
router.put('/', basketController.update);

module.exports = router;
