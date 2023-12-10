
const express = require('express');
const router = express.Router();

const {checkAuth, checkAuthRole} = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

const {
    getAllCities,
    getCityById,
    // createCity,
    // updateCity,
    // deleteCity,
} = require('../controllers/cityController');

/**
 * @swagger
 * tags:
 *  name: City
 *  description: City management API
 */

/**
 * @swagger
 * /api/v1/city:
 *   get:
 *     summary: Get all cities
 *     description: Get a list of all cities
 *     tags: [City]
 *     parameters:
 *       - in: query
 *         name: province_id
 *         schema:
 *           type: integer
 *         description: Optional. The unique identifier of the province to filter cities.
 *     responses:
 *       200:
 *         description: Cities found successfully
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
 *                   example: Cities found
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                         description: The unique identifier of the city.
 *                       name:
 *                         type: string
 *                         example: Jakarta
 *                         description: The name of the city.
 *                       province_id:
 *                         type: number
 *                         example: 1
 *                         description: The unique identifier of the province to which the city belongs.
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
router.get('/api/v1/city',  getAllCities);

/**
 * @swagger
 * /api/v1/city/{id}:
 *   get:
 *     summary: Get a city by ID
 *     description: Get detailed information about a city by providing its unique identifier.
 *     tags: [City]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The unique identifier of the city.
 *     responses:
 *       200:
 *         description: City found successfully
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
 *                   example: City found
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                       description: The unique identifier of the city.
 *                     name:
 *                       type: string
 *                       example: Jakarta
 *                       description: The name of the city.
 *                     province_id:
 *                       type: number
 *                       example: 1
 *                       description: The unique identifier of the province to which the city belongs.
 *       404:
 *         description: City not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating that the city was not found.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: City not found
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
router.get('/api/v1/city/:id', getCityById);

// router.post('/api/v1/city', checkAuth, checkAuthRole(RoleType.ALL), createCity);

// router.put('/api/v1/city/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), updateCity);

// router.delete('/api/v1/city/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), deleteCity);

module.exports = router;