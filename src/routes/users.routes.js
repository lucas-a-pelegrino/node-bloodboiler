const router = require('express').Router();
const { usersController } = require('../controllers');

router.get('/', usersController.list);
router.get('/:id', usersController.get);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.destroy);

module.exports.users = router;
