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
router.post('/api/v1/task', createTask);

// Read (All)
router.get('/api/v1/task', getAllTasks);

// Read (One)
router.get('/api/v1/task/:id', getTaskById);

// Update
router.put('/api/v1/task/:id', updateTask);

// Delete
router.delete('/api/v1/task/:id', deleteTask);

module.exports = router;