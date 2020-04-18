const router = require('express').Router();
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/signin', authController.signin);
router.post('/forgot-password', authController.forgotPassword);
router.post('/:token/reset-password', authController.resetPassword);

module.exports.auth = router;
