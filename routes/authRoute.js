const express = require('express');
const router = express.Router();
const { loginAdmin, login, logout, me } = require('./../controllers/authController');

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Authentication management 
 */

/**
 * @swagger
 * /api/v1/admin/login:
 *   post:
 *     summary: Admin login
 *     description: Login as an admin.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the admin.
 *               password:
 *                 type: string
 *                 description: The password for the admin.
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                       description: The JWT token for authentication.
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 1
 *                           description: The unique identifier of the admin.
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                           description: The name of the admin.
 *                         email:
 *                           type: string
 *                           example: john.doe@bcf.or.id
 *                           description: The email address of the admin.
 *                         role:
 *                           type: string
 *                           example: ADMIN
 *                           description: The role of the admin.
 *       401:
 *         description: Invalid email, password, or domain
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
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid email, password, or domain
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
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/api/v1/admin/login', loginAdmin);

/**
 * @swagger
 * /api/v1/participant/login:
 *   post:
 *     summary: Participant login
 *     description: Login as a participant
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the participant.
 *               password:
 *                 type: string
 *                 description: The password of the participant.
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlBBUlRJQ0FPTlkiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2MzUyMjY4NzAsImV4cCI6MTYzNTIyODQ3MH0.m6R4AmcZ3JrXQUg9O8McE9GZ8Lb_vSzZcimTjDVXcsw
 *                       description: The JWT token for authentication.
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 1
 *                           description: The unique identifier of the participant.
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                           description: The name of the participant.
 *                         email:
 *                           type: string
 *                           example: john.doe@example.com
 *                           description: The email address of the participant.
 *                         role:
 *                           type: string
 *                           example: PARTICIPANT
 *                           description: The role of the participant.
 *       401:
 *         description: Invalid email or password
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
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
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
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/api/v1/participant/login', login);

/**
 * @swagger
 * /api/v1/mentor/login:
 *   post:
 *     summary: Mentor login
 *     description: Login as a mentor
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the mentor.
 *               password:
 *                 type: string
 *                 description: The password of the mentor.
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Ik1FTlRPUlkiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2MzUyMjY4NzAsImV4cCI6MTYzNTIyODQ3MH0.m6R4AmcZ3JrXQUg9O8McE9GZ8Lb_vSzZcimTjDVXcsw
 *                       description: The JWT token for authentication.
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 1
 *                           description: The unique identifier of the mentor.
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                           description: The name of the mentor.
 *                         email:
 *                           type: string
 *                           example: john.doe@example.com
 *                           description: The email address of the mentor.
 *                         role:
 *                           type: string
 *                           example: MENTOR
 *                           description: The role of the mentor.
 *       401:
 *         description: Invalid email or password
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
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
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
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/api/v1/mentor/login', login);

/**
 * @swagger
 * /api/v1/logout:
 *   post:
 *     summary: Logout
 *     description: Logout the user
 *     tags: [Authentication]
 *     responses:
 *       205:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 205
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       400:
 *         description: No token cookie found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 400
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: No token cookie found. You are not logged in
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
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/api/v1/logout', logout);

/**
 * @swagger
 * /api/v1/me:
 *   get:
 *     summary: Get user data
 *     description: Get the data of the currently logged in user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successfully retrieved user's data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved user's data
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1
 *                       description: The unique identifier of the user.
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                       description: The name of the user.
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                       description: The email address of the user.
 *                     role:
 *                       type: string
 *                       example: MENTOR
 *                       description: The role of the user.
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
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: User not found
 *       400:
 *         description: Invalid role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 400
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid role
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
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/api/v1/me', me);

module.exports = router;
