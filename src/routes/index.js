const {
  Router,
} = require('express');

const router = Router();
const { isAuthorized } = require('../middlewares');
const authRoutes = require('../controllers/auth');
const userRoutes = require('../controllers/user');

// Authentication routes
router.post('/auth/signin', authRoutes.signin);
router.get('/auth/forgot-password/:email', authRoutes.forgetPassword);


// User routes
router.get('/users', isAuthorized, userRoutes.list);
router.get('/users/:_id', isAuthorized, userRoutes.get);
router.post('/users', isAuthorized, userRoutes.create);
router.put('/users/:_id', isAuthorized, userRoutes.update);
router.delete('/users/:_id', isAuthorized, userRoutes.destroy);

module.exports = router;
