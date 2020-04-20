const router = require('express').Router();
const yup = require('yup'); // Should be moved to same location as getUsersSchema!
const { usersController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');

// Should be moved to another location after middleware implementation is working correctly!
const getUsersSchema = yup.object().shape({
  query: yup.object().shape({
    page: yup.number().integer(),
    perPage: yup.number().integer(),
  }),
});

router.use(isAuthorized);

router.get('/', validate(getUsersSchema), usersController.list);
router.get('/:id', usersController.get);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.destroy);

module.exports.users = router;
