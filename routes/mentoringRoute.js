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
router.post('/api/v1/mentoring',  createMentoring);

// Read (All)
router.get('/api/v1/mentoring',  getAllMentorings);

// Read (One)
router.get('/api/v1/mentoring/:id',  getMentoringById);

// Update
router.put('/api/v1/mentoring/:id',  updateMentoring);

// Delete
router.delete('/api/v1/mentoring/:id',  deleteMentoring);

// Bulk search by Participant ID
router.get('/api/v1/mentoring/participant/:id',  getMentoringByParticipantId);

// Bulk search by Mentor ID
router.get('/api/v1/mentoring/mentor/:id',  getMentoringByMentorId);

// Bulk search by Mentor ID and Participant ID
router.get('/api/v1/mentoring/:participantId/:mentorId',  getMentoringByCombination);

module.exports = router;
