const express = require('express');
const router = express.Router();

const {checkAuth, checkAuthRole} = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

const { 
    addNew,
    // getAllMentors,
    getMentor,
    getMentorById,
    updateMentor,
    deleteMentor
} = require('../controllers/mentorController');

router.post('/api/v1/mentor', checkAuth, checkAuthRole(RoleType.SUPERADMIN), addNew);
router.get('/api/v1/mentor', checkAuth, checkAuthRole(RoleType.ALL), getMentor);
router.get('/api/v1/mentor/:id', checkAuth, checkAuthRole(RoleType.ALL), getMentorById);
router.put('/api/v1/mentor/:id', checkAuth, checkAuthRole([...RoleType.MENTOR, ...RoleType.SUPERADMIN]), updateMentor);
router.delete('/api/v1/mentor/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), deleteMentor);

// Export the router
module.exports = router;