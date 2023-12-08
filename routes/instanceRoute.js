const express = require('express');
const router = express.Router();

const {checkAuth, checkAuthRole} = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

const {
    getInstances,
    getInstancesByCoveredAreaId,
    getAllInstancesStatus,
    checkStatusByEmail,
    createInstance,
    getInstanceById,
    updateInstanceById,
    deleteInstanceById,
} = require('../controllers/instanceController');

// Route for getting all instances
router.get('/api/v1/instances', checkAuth, checkAuthRole(RoleType.ALL), getInstances);

// Route for getting instances by covered area ID
router.get('/api/v1/instances/covered-area/:cityId', checkAuth, getInstancesByCoveredAreaId);

// Route for getting all instances status
router.get('/api/v1/selection', checkAuth, checkAuthRole([...RoleType.MENTOR, ...RoleType.ADMINS]), getAllInstancesStatus);

// Route for checking instance status by email
router.post('/api/v1/selection/check', checkStatusByEmail);

// Route for creating a new instance
router.post('/api/v1/instances', checkAuth, checkAuthRole(RoleType.MENTOR), createInstance);

// Route for getting instance by ID
router.get('/api/v1/instances/:id', checkAuth, getInstanceById);

// Route for updating instance by ID
router.put('/api/v1/instances/:id', checkAuth, checkAuthRole(RoleType.MENTOR), updateInstanceById);

// Route for deleting instance by ID
router.delete('/api/v1/instances/:id', checkAuth, checkAuthRole(RoleType.MENTOR), deleteInstanceById);

module.exports = router;
