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
  sendTaskContentById,
} = require('../controllers/taskController');

// Create
router.post('/api/v1/task', checkAuth, checkAuthRole(RoleType.ADMIN), createTask);

// Read (All)
router.get('/api/v1/task', checkAuth, checkAuthRole(RoleType.ALL), getAllTasks);

// Read (One)
router.get('/api/v1/task/:id', checkAuth, checkAuthRole(RoleType.ALL), getTaskById);

// Update
router.put('/api/v1/task/:id', checkAuth, checkAuthRole(RoleType.ADMIN), updateTask);

// Delete
router.delete('/api/v1/task/:id', checkAuth, checkAuthRole(RoleType.ADMIN), deleteTask);

module.exports = router;