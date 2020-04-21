const router = require('express').Router();
const { authController } = require('../controllers');
const { validate } = require('../middlewares');
const {
  validationSchemas: { auth },
} = require('../helpers');

router.post('/register', validate(auth.register), authController.register);
router.post('/signin', validate(auth.signin), authController.signin);
router.post('/forgot-password', validate(auth.forgotPassword), authController.forgotPassword);
router.post('/:token/reset-password', validate(auth.resetPassword), authController.resetPassword);

module.exports.auth = router;