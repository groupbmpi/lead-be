const express = require('express');
const router = express.Router();
const { loginAdmin, login, logout, me } = require('../controllers/authController');

router.post('/api/v1/admin/login', loginAdmin);
router.post('/api/v1/participant/login', login);
router.post('/api/v1/mentor/login', login);
router.post('/api/v1/logout', logout);
router.get('/api/v1/me', me);

module.exports = router;
