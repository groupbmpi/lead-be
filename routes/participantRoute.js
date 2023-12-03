const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');
const { checkAuth, checkAuthRole } = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

router.post('/api/v1/participant/login', participantController.loginParticipant);
router.post('/api/v1/participant', participantController.createParticipant);
router.put('/api/v1/participant/:id?editPassword=true', checkAuth, checkAuthRole(RoleType.PARTICIPANT), participantController.addPassword);
router.put('/api/v1/participant/:id', checkAuth, checkAuthRole(RoleType.ADMINS), participantController.updateParticipant);
router.delete('/api/v1/participant/:id', checkAuthRole, checkAuthRole(RoleType.ADMINS), participantController.deleteParticipant);

module.exports = router;