const { Router } = require('express');

const router = Router();
const isAuthorized = require('../../middlewares/isAuthorized');
const userRoutes = require('../../controllers/user');

router.get('/', isAuthorized, userRoutes.list);
router.get('/:id', userRoutes.get);
router.post('/users', userRoutes.create);
router.put('/:id', userRoutes.update);
router.delete('/:id', userRoutes.destroy);

module.exports = router;
