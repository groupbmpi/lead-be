const express = require('express');
const router = express.Router();

const { checkAuth, checkAuthRole } = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// Create
router.post('/api/v1/task', checkAuth, checkAuthRole([RoleType.ADMINS, RoleType.MENTOR]), createTask);

// Read (All)
router.get('/api/v1/task', checkAuth, checkAuthRole(RoleType.ALL), getAllTasks);

// Read (One)
router.get('/api/v1/task/:id', checkAuth, checkAuthRole(RoleType.ALL), getTaskById);

// Update
router.put('/api/v1/task/:id', checkAuth, checkAuthRole([RoleType.ADMINS, RoleType.MENTOR]), updateTask);

// Delete
router.delete('/api/v1/task/:id', checkAuth, checkAuthRole([RoleType.ADMINS, RoleType.MENTOR]), deleteTask);

module.exports = router;