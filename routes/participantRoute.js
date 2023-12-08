const express = require('express');
const router = express.Router();
const {
    createParticipant,
    addPassword,
    updateParticipant,
    deleteParticipant,
    getAllParticipants,
    getParticipantsByMentorId,
    getParticipantById
  } = require('../controllers/participantController');
const { checkAuth, checkAuthRole } = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

// router.post('/api/v1/participant/login', loginParticipant);
router.get('/api/v1/participant', getAllParticipants);
router.get('/api/v1/participant/:id', getParticipantById);
router.post('/api/v1/participant', createParticipant);
router.put('/api/v1/participant/:id?editPassword=true', checkAuth, checkAuthRole(RoleType.PARTICIPANT), addPassword);
router.put('/api/v1/participant/:id', checkAuth, checkAuthRole(RoleType.ADMINS), updateParticipant);
router.delete('/api/v1/participant/:id', checkAuthRole, checkAuthRole(RoleType.ADMINS), deleteParticipant);

module.exports = router;