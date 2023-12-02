const express = require('express');
const router = express.Router();

const {checkAuth} = require('../middleware/checkauth');

const { 
    createAdmin, 
    getAllAdmins, 
    getAdminById, 
    updateAdmin, 
    deleteAdmin, 
    loginAdmin 
} = require('../controllers/adminController');

// Create admin
router.post('/api/admin', createAdmin);

// Get all admins
router.get('/api/admin', checkAuth, getAllAdmins);

// Get admin by ID
router.get('/api/admin/:id', checkAuth, getAdminById);

// Update admin
router.put('/api/admin/:id', checkAuth, updateAdmin);

// Delete admin
router.delete('/api/admin/:id', checkAuth, deleteAdmin);

// Admin login
router.post('/api/admin/login', loginAdmin);

// Export the router
module.exports = router;