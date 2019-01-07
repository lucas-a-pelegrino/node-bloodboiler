const {
  Router,
} = require('express');

const router = Router();
const authRoutes = require('../controllers/auth');
const userRoutes = require('../controllers/user');

// Authentication routes
router.post('/auth/signin', authRoutes.signin);

// User routes
router.get('/users', userRoutes.list);
router.get('/users/:_id', userRoutes.get);
router.post('/users', userRoutes.create);
router.put('/users/:_id', userRoutes.update);
router.delete('/users/:_id', userRoutes.destroy);

module.exports = router;
