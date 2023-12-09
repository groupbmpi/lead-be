const express = require('express');
const router = express.Router();
const {
    createParticipant,
    addPassword,
    checkIfPasswordExist,
    updateParticipant,
    deleteParticipant,
    getParticipant
  } = require('../controllers/participantController');
const { checkAuth, checkAuthRole } = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

router.get('/api/v1/participant', getParticipant);
router.post('/api/v1/participant', createParticipant);
router.get('/api/v1/participant/:id/password', checkIfPasswordExist);
router.put('/api/v1/participant/:id/password/add', addPassword);
router.put('/api/v1/participant/:id', checkAuth, checkAuthRole([...RoleType.SUPERADMIN, ...RoleType.PARTICIPANT]), updateParticipant);
router.delete('/api/v1/participant/:id', checkAuth, deleteParticipant);
// router.delete('/api/v1/participant/:id', checkAuthRole, checkAuthRole(RoleType.SUPERADMIN), deleteParticipant);

module.exports = router;