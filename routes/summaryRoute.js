const express = require('express');
const router = express.Router();

const { getDashboardSummary } = require('../controllers/dashboardSummaryController');
const { checkAuth, checkAuthRole } = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

/**
 * @swagger
 * /api/v1/dashboard-summary:
 *   get:
 *     summary: Get dashboard summary
 *     description: Get a summary of data for the dashboard.
 *     tags: [Dashboard]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: include
 *         schema:
 *           type: string
 *         description: Comma-separated list of data to include in the summary (type, sector, established_year, area, covered_areas, beneficiaries, total_beneficiaries, fund_source, participant_data, all).
 *         example: "type,sector,beneficiaries"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter instances by status (all, Menunggu, Ditolak, Wawancara, Lolos).
 *         example: "Lolos"
 *       - in: query
 *         name: total_only
 *         schema:
 *           type: boolean
 *         description: Get only the total count without instance details.
 *         example: true
 *     responses:
 *       200:
 *         description: Successfully retrieved dashboard summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: HTTP status code
 *                   example: 200
 *                 status:
 *                   type: string
 *                   description: Status of the response (success or error)
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   description: A brief message describing the status of the request
 *                   example: "Berhasil mendapatkan rekapan data dashboard"
 *                 data:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: object
 *                       description: Summary of instances by type
 *                     sector:
 *                       type: object
 *                       description: Summary of instances by sector
 *                     established_year:
 *                       type: object
 *                       description: Summary of instances by established year
 *                     area:
 *                       type: object
 *                       description: Summary of instances by area
 *                     covered_areas:
 *                       type: object
 *                       description: Summary of instances by covered areas
 *                     beneficiaries:
 *                       type: object
 *                       description: Summary of instances by beneficiaries
 *                     total_beneficiaries:
 *                       type: object
 *                       description: Summary of total beneficiaries
 *                       properties:
 *                         total:
 *                           type: number
 *                           description: Total number of beneficiaries
 *                         instances_total_beneficiaries:
 *                           type: object
 *                           description: Summary of instances by total beneficiaries
 *                     fund_source:
 *                       type: object
 *                       description: Summary of instances by fund source
 *                     participant_data:
 *                       type: object
 *                       description: Summary of participant data
 *                       properties:
 *                         total:
 *                           type: number
 *                           description: Total number of participants
 *                         position:
 *                           type: object
 *                           description: Summary of instances by participant position
 *                         latest_education:
 *                           type: object
 *                           description: Summary of instances by participant education
 *                         confirmation_1:
 *                           type: object
 *                           description: Summary of instances by participant confirmation_1
 *                         confirmation_2:
 *                           type: object
 *                           description: Summary of instances by participant confirmation_2
 *                         confirmation_3:
 *                           type: object
 *                           description: Summary of instances by participant confirmation_3
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 401
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired token! Login to continue"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 403
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Forbidden access"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 500
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Internal server error: <error details>"
 */
router.get('/api/v1/dashboard-summary', checkAuth, checkAuthRole(RoleType.ADMINS), getDashboardSummary);

module.exports = router;
