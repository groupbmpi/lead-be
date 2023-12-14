const express = require('express');
const router = express.Router();
const { checkAuth, checkAuthRole } = require('./../middleware/checkauth');

const RoleType = require('./../utils/roleType');

// Import controllers
const {
    getAllProvinces,
    getProvinceById,
    // createProvince,
    // updateProvinceById,
    // deleteProvinceById
} = require('./../controllers/provinceController');

/**
 * @swagger
 * tags:
 *  name: Province
 *  description: Province management API
 */


/**
 * @swagger
 * /api/v1/province:
 *   get:
 *     summary: Get all provinces
 *     description: Retrieve a list of all provinces
 *     tags: [Province]
 *     responses:
 *       200:
 *         description: Provinces retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   example: success
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   example: Success
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                         description: The unique identifier of the province.
 *                       name:
 *                         type: string
 *                         example: Jakarta
 *                         description: The name of the province.
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
 *                   description: The HTTP status code indicating an internal server error.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                   description: A brief message describing the error.
 */
// Get all provinces
router.get('/api/v1/province', getAllProvinces);

/**
 * @swagger
 * /api/v1/province/{id}:
 *   get:
 *     summary: Get a province by ID
 *     description: Retrieve information about a province based on its unique identifier.
 *     tags: [Province]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the province.
 *     responses:
 *       200:
 *         description: Province found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   example: success
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   example: Success
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1
 *                       description: The unique identifier of the province.
 *                     name:
 *                       type: string
 *                       example: Jakarta
 *                       description: The name of the province.
 *       404:
 *         description: Province not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating that the province was not found.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Province not found
 *                   description: A brief message describing the error.
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
 *                   description: The HTTP status code indicating an internal server error.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                   description: A brief message describing the error.
 */
// Get a province by ID
router.get('/api/v1/province/:id', getProvinceById);

// // Create a new province
// router.post('/api/v1/province', checkAuth, checkAuthRole(RoleType.ALL), createProvince);

// // Update a province by ID
// router.put('/api/v1/province/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), updateProvinceById);

// // Delete a province by ID
// router.delete('/api/v1/province/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), deleteProvinceById);

module.exports = router;
