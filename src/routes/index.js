const {
  Router,
} = require('express');

const router = Router();
const { isAuthorized } = require('../middlewares');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');

// Authentication routes
router.post('/auth/signin', authController.signin);
router.get('/auth/forgot-password/:email', authController.forgotPassword);

// User routes
router.get('/users', isAuthorized, userController.list);
router.get('/users/:_id', isAuthorized, userController.get);
router.post('/users', isAuthorized, userController.create);
router.put('/users/:_id', isAuthorized, userController.update);
router.delete('/users/:_id', isAuthorized, userController.destroy);
router.patch('/users/:token/reset-password', userController.resetPassword);

module.exports = router;
