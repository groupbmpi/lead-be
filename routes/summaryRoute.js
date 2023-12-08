const express = require('express');
const router = express.Router();

const { getDashboardSummary } = require('../controllers/dashboardSummaryController');

router.get('/api/v1/dashboard-summary', getDashboardSummary);

module.exports = router;
