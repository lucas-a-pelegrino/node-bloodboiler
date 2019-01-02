const {
  Router,
} = require('express');

const {
  list,
} = require('../controllers/user/list');

const router = Router();

router.get('/', (req, res) => { 
  return res.status(200).json({ message: 'test' });
});

// User routes
router.get('/users', list);

module.exports = router;
