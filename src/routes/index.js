const {
  Router,
} = require('express');

const router = Router();
const userRoutes = require('../controllers/user');

// User routes
router.get('/users', userRoutes.list);
router.get('/users/:_id', userRoutes.get);
router.post('/users', userRoutes.create);
router.put('/users/:_id', userRoutes.update);
router.delete('/users/:_id', userRoutes.destroy);

module.exports = router;
