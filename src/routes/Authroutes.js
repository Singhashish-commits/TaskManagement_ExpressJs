const express = require('express');
const router = express.Router();

const { register, login, getProfile } = require('../controllers/AuthController');
const { protect } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/Validate');

// POST /api/auth/register
router.post('/register', validateRegister, register);

// POST /api/auth/login
router.post('/login', validateLogin, login);

// GET /api/auth/profile
router.get('/profile', protect, getProfile);

module.exports = router;