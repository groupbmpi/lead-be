const express = require('express');
const router = express.Router();

const {checkAuth, checkAuthRole} = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

const {
    createInformationBanner, 
    getAllInformationBanners, 
    getInformationBannerById, 
    updateInformationBanner, 
    deleteInformationBanner, 
} = require('../controllers/informationBannerController');

// Create
router.post('/api/v1/informationBanner', checkAuth, checkAuthRole(RoleType.ADMINS), createInformationBanner);

// Read (All)
router.get('/api/v1/informationBanner', checkAuth, checkAuthRole(RoleType.ALL), getAllInformationBanners);

// Read (One)
router.get('/api/v1/informationBanner/:id', checkAuth, checkAuthRole(RoleType.ALL), getInformationBannerById);

// Update
router.put('/api/v1/informationBanner/:id', checkAuth, checkAuthRole(RoleType.ADMINS), updateInformationBanner);

// Delete
router.delete('/api/v1/informationBanner/:id', checkAuth, checkAuthRole(RoleType.ADMINS), deleteInformationBanner);

module.exports = router;
