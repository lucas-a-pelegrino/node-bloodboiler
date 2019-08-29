const router = require('express').Router();
const { usersController } = require('../controllers');
const { isAuthorized } = require('../middlewares');

router.get('/', isAuthorized, usersController.list);
router.get('/:_id', isAuthorized, usersController.get);
router.post('/', isAuthorized, usersController.create);
router.put('/:_id', isAuthorized, usersController.update);
router.delete('/:_id', isAuthorized, usersController.destroy);
router.patch('/:token/reset-password', usersController.resetPassword);


module.exports = router;
