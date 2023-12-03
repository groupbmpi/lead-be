const express = require('express');
const router = express.Router();
const { checkAuth, checkAuthRole } = require('../middleware/checkauth');

const RoleType = require('../utils/roleType');

// Import controllers
const {
    getAllProvinces,
    getProvinceById,
    // createProvince,
    // updateProvinceById,
    // deleteProvinceById
} = require('../controllers/provinceController');

// Get all provinces
router.get('/api/v1/province', checkAuth, checkAuthRole(RoleType.ALL), getAllProvinces);

// Get a province by ID
router.get('/api/v1/province/:id', checkAuth, checkAuthRole(RoleType.ALL), getProvinceById);

// // Create a new province
// router.post('/api/v1/province', checkAuth, checkAuthRole(RoleType.ALL), createProvince);

// // Update a province by ID
// router.put('/api/v1/province/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), updateProvinceById);

// // Delete a province by ID
// router.delete('/api/v1/province/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), deleteProvinceById);

module.exports = router;
