const express = require('express');
const router = express.Router();

const { checkAuth, checkAuthRole } = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

const {
    createMentoring,
    getAllMentorings,
    getMentoringById,
    updateMentoring,
    deleteMentoring,
    getMentoringByMentorId,
    getMentoringByParticipantId,
    getMentoringByCombination
} = require('../controllers/mentoringController');

// Create
router.post('/api/v1/mentoring', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), createMentoring);

// Read (All)
router.get('/api/v1/mentoring', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), getAllMentorings);

// Read (One)
router.get('/api/v1/mentoring/:id', checkAuth, checkAuthRole(RoleType.ALL), getMentoringById);

// Update
router.put('/api/v1/mentoring/:id', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), updateMentoring);

// Delete
router.delete('/api/v1/mentoring/:id', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), deleteMentoring);

// Bulk search by Participant ID
router.get('/api/v1/mentoring/participant/:id', checkAuth, checkAuthRole(RoleType.ALL), getMentoringByParticipantId);

// Bulk search by Mentor ID
router.get('/api/v1/mentoring/mentor/:id', checkAuth, checkAuthRole(RoleType.ALL), getMentoringByMentorId);

// Bulk search by Mentor ID and Participant ID
router.get('/api/v1/mentoring/:participantId/:mentorId', checkAuth, checkAuthRole(RoleType.ALL), getMentoringByCombination);

module.exports = router;
