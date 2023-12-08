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
    sendBannerContentById
} = require('../controllers/informationBannerController');

// Create
router.post('/api/v1/informationBanner', checkAuth, checkAuthRole(RoleType.SUPERADMIN), createInformationBanner);

// Read (All)
router.get('/api/v1/informationBanner', checkAuth, checkAuthRole(RoleType.ALL), getAllInformationBanners);

// Read (One)
router.get('/api/v1/informationBanner/:id', checkAuth, checkAuthRole(RoleType.ALL), getInformationBannerById);

// Update
router.put('/api/v1/informationBanner/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), updateInformationBanner);

// Delete
router.delete('/api/v1/informationBanner/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), deleteInformationBanner);

// Send Banner ID to emails
router.post('/api/v1/informationBanner/send/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), sendBannerContentById);

module.exports = router;
