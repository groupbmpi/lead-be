const express = require('express');
const router = express.Router();

const {checkAuth, checkAuthRole} = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

const { 
    createMentor,
    getAllMentors,
    getMentorById,
    updateMentor,
    deleteMentor,
    login
} = require('../controllers/mentorController');

// Create mentor

// Get all mentors
router.get('/api/v1/mentor', checkAuth, checkAuthRole(RoleType.ALL), getAllMentors);

// Get mentor by ID
router.get('/api/v1/mentor/:id', checkAuth, checkAuthRole(RoleType.ALL), getMentorById);

// Update mentor
router.put('/api/v1/mentor/:id', checkAuth, checkAuthRole([...RoleType.MENTOR, ...RoleType.SUPERADMIN]), updateMentor);

// Delete mentor
router.delete('/api/v1/mentor/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), deleteMentor);

// Mentor login
router.post('/api/v1/mentor/login', login);

// Mentor registration
router.post('/api/v1/mentor', createMentor);

// Export the router
module.exports = router;