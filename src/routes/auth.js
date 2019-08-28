const router = require('express').Router();
const { authController } = require('../controllers');

router.post('/signin', authController.signin);
router.get('/account/:email/password', authController.resetPassword);

module.exports = router;
