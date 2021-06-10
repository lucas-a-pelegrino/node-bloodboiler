const router = require('express').Router();
const { authController, usersController } = require('../controllers');
const { validate } = require('../middlewares');
const {
  validationSchemas: { auth, users },
} = require('../validations');

router.post('/register', validate(users.create), usersController.create);
router.post('/signin', validate(auth.signin), authController.signin);
router.post('/refresh-token', validate(auth.refreshToken), authController.refreshToken);
router.post('/forgot-password', validate(auth.forgotPassword), authController.forgotPassword);
router.post('/:token/reset-password', validate(auth.resetPassword), authController.resetPassword);

module.exports.auth = router;
