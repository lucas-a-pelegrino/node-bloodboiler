const router = require('express').Router();
const { usersController } = require('../controllers');

router.post('/', usersController.create);

module.exports.users = router;
