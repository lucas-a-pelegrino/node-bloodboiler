const router = require('express').Router();
const { usersController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { users },
} = require('../helpers');

router.use(isAuthorized);

router.get('/', validate(users.get), usersController.list);
router.get('/:id', usersController.get);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.destroy);

module.exports.users = router;
