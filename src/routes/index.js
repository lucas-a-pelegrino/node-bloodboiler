const {
  Router,
} = require('express');

const router = Router();

const { list } = require('../controllers/user/list');
const { get } = require('../controllers/user/get');
const { create } = require('../controllers/user/create');

const userRoutes = { list, get, create };

// User routes
router.get('/users', userRoutes.list);
router.get('/users/:_id', userRoutes.get);
router.post('/users', userRoutes.create);

module.exports = router;
