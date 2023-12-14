const express = require('express');
const router = express.Router();

const {checkAuth, checkAuthRole} = require('./../middleware/checkauth');
const RoleType = require('./../utils/roleType');

const {
    exportLookerCsv
} = require('./../controllers/dataExportController');

/**
 * @swagger
 * tags:
 *  name: Data Export
 *  description: Data Export API
 */

/**
 * @swagger
 * /api/v1/export:
 *   get:
 *     summary: Export Looker CSV data
 *     tags: [Data Export]
 *     responses:
 *       200:
 *         description: CSV data exported successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *               description: CSV file containing Looker data
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               code: 500
 *               status: "error"
 *               message: "Internal Server Error"
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating an internal server error.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   description: A brief message describing the error.
 */
router.get('/api/v1/export', exportLookerCsv);

module.exports = router;