const express = require('express');
const router = express.Router();

const {checkAuth, checkAuthRole} = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

const {
    getInstances,
    // getAllInstancesStatus,
    checkStatusByEmail,
    getInstanceById,
    updateInstanceById,
    deleteInstanceById,
} = require('../controllers/instanceController');

// Route for getting all instances with or without filter
router.get('/api/v1/instance', checkAuth, checkAuthRole(RoleType.ALL), getInstances);

// Route for checking instance status by email
router.post('/api/v1/instance/status', checkStatusByEmail);

// // Route for creating a new instance
// router.post('/api/v1/instances', checkAuth, checkAuthRole(RoleType.MENTOR), createInstance);

// Route for getting instance by ID
router.get('/api/v1/instance/:id', checkAuth, getInstanceById);

// Route for updating instance by ID
router.put('/api/v1/instance/:id', checkAuth, checkAuthRole([...RoleType.PARTICIPANT, ...RoleType.SUPERADMIN]), updateInstanceById);

// Route for deleting instance by ID
router.delete('/api/v1/instance/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), deleteInstanceById);

module.exports = router;
