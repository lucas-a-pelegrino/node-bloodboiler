const router = require('express').Router();
const { usersController } = require('../controllers');

router.get('/', usersController.list);
router.get('/:id', usersController.get);
router.post('/', usersController.create);

module.exports.users = router;
