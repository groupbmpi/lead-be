
const express = require('express');
const router = express.Router();

const {checkAuth, checkAuthRole} = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

const {
    getAllCities,
    getCityById,
    // createCity,
    // updateCity,
    // deleteCity,
} = require('../controllers/cityController');

router.get('/api/v1/city',  getAllCities);

router.get('/api/v1/city/:id', getCityById);

// router.post('/api/v1/city', checkAuth, checkAuthRole(RoleType.ALL), createCity);

// router.put('/api/v1/city/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), updateCity);

// router.delete('/api/v1/city/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), deleteCity);

module.exports = router;