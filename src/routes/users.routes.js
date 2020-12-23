const router = require('express').Router();
const { usersController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { users },
} = require('../validations');

router.use(isAuthorized);

router.get('/', validate(users.list), usersController.list);
router.get('/:id', validate(users.get), usersController.get);
router.post('/', validate(users.create), usersController.create);
router.put('/:id', validate(users.update), usersController.update);
router.delete('/:id', validate(users.destroy), usersController.destroy);

module.exports.users = router;
