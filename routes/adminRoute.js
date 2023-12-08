const express = require('express');
const router = express.Router();

const {checkAuth, checkAuthRole} = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

const { 
    createAdmin, 
    getAllAdmins, 
    getAdminById, 
    updateAdmin, 
    deleteAdmin, 
} = require('../controllers/adminController');

// Create admin
router.post('/api/v1/admin', checkAuth, checkAuthRole(RoleType.SUPERADMIN), createAdmin);
// router.post('/api/v1/admin', createAdmin);

// Get all admins
router.get('/api/v1/admin', checkAuth, checkAuthRole(RoleType.ADMINS), getAllAdmins);

// Get admin by ID
router.get('/api/v1/admin/:id', checkAuth, checkAuthRole(RoleType.ADMINS), getAdminById);

// Update admin
router.put('/api/v1/admin/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), updateAdmin);

// Delete admin
router.delete('/api/v1/admin/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), deleteAdmin);

// Admin login
// router.post('/api/v1/admin/login', loginAdmin);

// Export the router
module.exports = router;