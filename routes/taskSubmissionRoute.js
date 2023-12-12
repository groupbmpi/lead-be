const express = require('express');
const router = express.Router();

const { checkAuth, checkAuthRole } = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

const {
  createTaskSubmission,
  getAllTaskSubmissions,
  getTaskSubmissionById,
  updateTaskSubmission,
  deleteTaskSubmission,
  getTaskSubmissionByTaskId,
  getTaskSubmissionByParticipantId,
  getTaskSubmissionByCombination,
} = require('../controllers/taskSubmissionController');

// Create
router.post('/api/v1/taskSubmission', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), createTaskSubmission);

// Read (All)
router.get('/api/v1/taskSubmission', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), getAllTaskSubmissions);

// Read (One)
router.get('/api/v1/taskSubmission/:id', checkAuth, checkAuthRole(RoleType.ALL), getTaskSubmissionById);

// Update
router.put('/api/v1/taskSubmission/:id', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), updateTaskSubmission);

// Delete
router.delete('/api/v1/taskSubmission/:id', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), deleteTaskSubmission);

// Read (All) by Task id
router.get('/api/v1/taskSubmission/task/:id', checkAuth, checkAuthRole(RoleType.ALL), getTaskSubmissionByTaskId);

// Read (All) by Participant id
router.get('/api/v1/taskSubmission/participant/:id', checkAuth, checkAuthRole(RoleType.ALL), getTaskSubmissionByParticipantId);

// Read (All) by combination
router.get('/api/v1/taskSubmission/:participantId/:taskId', checkAuth, checkAuthRole(RoleType.ALL), getTaskSubmissionByCombination);

module.exports = router;
