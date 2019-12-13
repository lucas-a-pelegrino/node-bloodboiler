const router = require('express').Router();
const { authController, usersController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.post('/auth/signin', authController.signin);
router.get('/auth/account/:email/password', authController.resetPassword);

router.get('/users/', isAuthorized, usersController.list);
router.get('/users/:_id([0-9a-f]{24})', isAuthorized, usersController.get);
router.post('/users/', isAuthorized, usersController.create);
router.put('/users/:_id([0-9a-f]{24})', isAuthorized, usersController.update);
router.delete('/users/:_id([0-9a-f]{24})', isAuthorized, usersController.destroy);
router.patch('/users/:token/password', usersController.resetPassword);

module.exports = router;
