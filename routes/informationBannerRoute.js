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

/**
 * @swagger
 * /api/v1/informationBanner:
 *   post:
 *     summary: Create a new information banner
 *     tags: [Information Banners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url_picture:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Information banner created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Banner created"
 *               code: 201
 *               status: "success"
 *               data:
 *                 url_picture: "example_url"
 *                 text: "Banner text"
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A brief message describing the result.
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating success.
 *                 data:
 *                   type: object
 *                   properties:
 *                     url_picture:
 *                       type: string
 *                       description: The URL of the banner picture.
 *                     text:
 *                       type: string
 *                       description: The text content of the banner.
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
router.post('/api/v1/informationBanner', checkAuth, checkAuthRole(RoleType.SUPERADMIN), createInformationBanner);

/**
 * @swagger
 * /api/v1/informationBanner:
 *   get:
 *     summary: Get all information banners
 *     tags: [Information Banners]
 *     responses:
 *       200:
 *         description: Information banners retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Information banners retrieved successfully"
 *               code: 200
 *               status: "success"
 *               data:
 *                 - url_picture: "example_url_1"
 *                   text: "Banner text 1"
 *                 - url_picture: "example_url_2"
 *                   text: "Banner text 2"
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A brief message describing the result.
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating success.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url_picture:
 *                         type: string
 *                         description: The URL of the banner picture.
 *                       text:
 *                         type: string
 *                         description: The text content of the banner.
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
router.get('/api/v1/informationBanner', checkAuth, checkAuthRole(RoleType.ALL), getAllInformationBanners);

/**
 * @swagger
 * /api/v1/informationBanner/{id}:
 *   get:
 *     summary: Get information banner by ID
 *     tags: [Information Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the information banner.
 *     responses:
 *       200:
 *         description: Information banner retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               url_picture: "example_url"
 *               text: "Banner text"
 *             schema:
 *               type: object
 *               properties:
 *                 url_picture:
 *                   type: string
 *                   description: The URL of the banner picture.
 *                 text:
 *                   type: string
 *                   description: The text content of the banner.
 *       404:
 *         description: Information banner not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "Banner not found"
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating a not found error.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   description: A brief message describing the error.
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
router.get('/api/v1/informationBanner/:id', checkAuth, checkAuthRole(RoleType.ALL), getInformationBannerById);

/**
 * @swagger
 * /api/v1/informationBanner/{id}:
 *   put:
 *     summary: Update information banner by ID
 *     tags: [Information Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the information banner.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url_picture:
 *                 type: string
 *                 description: The new URL of the banner picture.
 *               text:
 *                 type: string
 *                 description: The new text content of the banner.
 *     responses:
 *       200:
 *         description: Information banner updated successfully
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               status: "success"
 *               message: "Information banner updated successfully"
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating success.
 *                 message:
 *                   type: string
 *                   description: A brief message describing the result.
 *       404:
 *         description: Information banner not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "Information banner not found"
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating a not found error.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   description: A brief message describing the error.
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
router.put('/api/v1/informationBanner/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), updateInformationBanner);

/**
 * @swagger
 * /api/v1/informationBanner/{id}:
 *   delete:
 *     summary: Delete information banner by ID
 *     tags: [Information Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the information banner.
 *     responses:
 *       200:
 *         description: Information banner deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               status: "success"
 *               message: "Banner ID:1 deleted successfully"
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating success.
 *                 message:
 *                   type: string
 *                   description: A brief message describing the result.
 *       404:
 *         description: Information banner not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "Banner not found"
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating a not found error.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   description: A brief message describing the error.
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
router.delete('/api/v1/informationBanner/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), deleteInformationBanner);

/**
 * @swagger
 * /api/v1/informationBanner/send/{id}:
 *   post:
 *     summary: Send banner content by ID via email
 *     tags: [Information Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the information banner.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipientEmails:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of recipient email addresses.
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               status: "success"
 *               message: "Email sent successfully"
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating success.
 *                 message:
 *                   type: string
 *                   description: A brief message describing the result.
 *       404:
 *         description: Information banner not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "Banner not found"
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating a not found error.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   description: A brief message describing the error.
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
router.post('/api/v1/informationBanner/send/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), sendBannerContentById);

module.exports = router;
