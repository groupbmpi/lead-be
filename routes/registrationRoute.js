
const express = require('express');
const router = express.Router();
const { checkAuth, checkAuthRole } = require('../middleware/checkauth');
const { register } = require('../controllers/registrationController');

const RoleType = require('../utils/roleType');

router.post('/api/v1/register', register);

export default router;