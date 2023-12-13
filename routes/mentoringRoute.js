const express = require('express');
const router = express.Router();

const { checkAuth, checkAuthRole } = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

const {
    createMentoring,
    getAllMentorings,
    getMentoringById,
    updateMentoring,
    deleteMentoring,
    getMentoringByMentorId,
    getMentoringByParticipantId,
    getMentoringByCombination
} = require('../controllers/mentoringController');

/**
 * @swagger
 * /api/v1/mentoring:
 *   post:
 *     summary: Create a new mentoring session
 *     tags: [Mentoring]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentor_id:
 *                 type: integer
 *               participant_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               datetime_start:
 *                 type: string
 *                 format: date-time
 *               datetime_finish:
 *                 type: string
 *                 format: date-time
 *               url_meet:
 *                 type: string
 *                 description: The URL for the meeting.
 *     responses:
 *       201:
 *         description: Mentoring session created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Mentoring created"
 *               newMentoring:
 *                 mentoring_id: 1
 *                 mentor_id: 1
 *                 participant_id: 2
 *                 title: "Introduction to Programming"
 *                 description: "Learn the basics of programming with a mentor."
 *                 datetime_start: "2023-12-31T10:00:00Z"
 *                 datetime_finish: "2023-12-31T11:00:00Z"
 *                 url_meet: "https://meet.example.com/123456"
 *               code: 201
 *               status: "success"
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A brief message describing the result.
 *                 newMentoring:
 *                   $ref: '#/components/schemas/Mentoring'
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating success.
 *       404:
 *         description: Mentor or participant not found with the provided IDs
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "Mentor not found with the provided mentor_id"
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
router.post('/api/v1/mentoring', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), createMentoring);

/**
 * @swagger
 * /api/v1/mentoring:
 *   get:
 *     summary: Get all mentorings
 *     tags: [Mentoring]
 *     responses:
 *       200:
 *         description: Mentorings retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Mentorings retrieved successfully"
 *               mentorings:
 *                 - mentoring_id: 1
 *                   mentor_id: 1
 *                   participant_id: 2
 *                   title: "Introduction to Programming"
 *                   description: "Learn the basics of programming with a mentor."
 *                   datetime_start: "2023-12-31T10:00:00Z"
 *                   datetime_finish: "2023-12-31T11:00:00Z"
 *                   url_meet: "https://meet.example.com/123456"
 *                 - mentoring_id: 2
 *                   mentor_id: 3
 *                   participant_id: 4
 *                   title: "Web Development Workshop"
 *                   description: "Explore the world of web development with an experienced mentor."
 *                   datetime_start: "2023-12-31T14:00:00Z"
 *                   datetime_finish: "2023-12-31T16:00:00Z"
 *                   url_meet: "https://meet.example.com/789012"
 *               code: 200
 *               status: "success"
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A brief message describing the result.
 *                 mentorings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mentoring'
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating success.
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
router.get('/api/v1/mentoring', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), getAllMentorings);

/**
 * @swagger
 * /api/v1/mentoring/{id}:
 *   get:
 *     summary: Get mentoring by ID
 *     tags: [Mentoring]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique identifier of the mentoring.
 *     responses:
 *       200:
 *         description: Mentoring retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Mentoring retrieved successfully"
 *               mentoring_id: 1
 *               mentor_id: 1
 *               participant_id: 2
 *               title: "Introduction to Programming"
 *               description: "Learn the basics of programming with a mentor."
 *               datetime_start: "2023-12-31T10:00:00Z"
 *               datetime_finish: "2023-12-31T11:00:00Z"
 *               url_meet: "https://meet.example.com/123456"
 *               code: 200
 *               status: "success"
 *             schema:
 *               $ref: '#/components/schemas/Mentoring'
 *       404:
 *         description: Mentoring not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "Mentoring not found"
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
router.get('/api/v1/mentoring/:id', checkAuth, checkAuthRole(RoleType.ALL), getMentoringById);

/**
 * @swagger
 * /api/v1/mentoring/{id}:
 *   put:
 *     summary: Update mentoring by ID
 *     tags: [Mentoring]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique identifier of the mentoring.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentor_id:
 *                 type: integer
 *               participant_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               datetime_start:
 *                 type: string
 *                 format: date-time
 *               datetime_finish:
 *                 type: string
 *                 format: date-time
 *               url_meet:
 *                 type: string
 *             required:
 *               - mentor_id
 *               - participant_id
 *               - title
 *               - description
 *               - datetime_start
 *               - datetime_finish
 *               - url_meet
 *     responses:
 *       200:
 *         description: Mentoring updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Mentoring updated successfully"
 *               code: 200
 *               status: "success"
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
 *       404:
 *         description: Mentoring not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "Mentoring not found"
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
router.put('/api/v1/mentoring/:id', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), updateMentoring);

/**
 * @swagger
 * /api/v1/mentoring/{id}:
 *   delete:
 *     summary: Delete a mentoring by ID
 *     tags: [Mentoring]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique identifier of the mentoring.
 *     responses:
 *       200:
 *         description: Mentoring deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Mentoring ID:1 deleted successfully"
 *               code: 200
 *               status: "success"
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
 *       404:
 *         description: Mentoring not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "Mentoring not found"
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
router.delete('/api/v1/mentoring/:id', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), deleteMentoring);

/**
 * @swagger
 * /api/v1/mentoring/participant/{id}:
 *   get:
 *     summary: Get mentorings by participant ID
 *     tags: [Mentoring]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique identifier of the participant.
 *     responses:
 *       200:
 *         description: Mentorings retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Mentorings retrieved successfully for Participant ID: 1"
 *               mentorings:
 *                 - mentoring_id: 1
 *                   mentor_id: 2
 *                   participant_id: 1
 *                   title: "Mentoring Title"
 *                   description: "Mentoring Description"
 *                   datetime_start: "2023-12-31T10:00:00Z"
 *                   datetime_finish: "2023-12-31T12:00:00Z"
 *                   url_meet: "https://meet.example.com"
 *               code: 200
 *               status: "success"
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A brief message describing the result.
 *                 mentorings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mentoring'
 *                   description: The list of mentorings associated with the participant.
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating success.
 *       404:
 *         description: No mentorings found with the specified participant ID
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "No mentorings found with the specified participant ID"
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
router.get('/api/v1/mentoring/participant/:id', checkAuth, checkAuthRole(RoleType.ALL), getMentoringByParticipantId);

/**
 * @swagger
 * /api/v1/mentoring/mentor/{id}:
 *   get:
 *     summary: Get mentorings by mentor ID
 *     tags: [Mentoring]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique identifier of the mentor.
 *     responses:
 *       200:
 *         description: Mentorings retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Mentorings retrieved successfully for Mentor ID: 1"
 *               mentorings:
 *                 - mentoring_id: 1
 *                   mentor_id: 1
 *                   participant_id: 2
 *                   title: "Mentoring Title"
 *                   description: "Mentoring Description"
 *                   datetime_start: "2023-12-31T10:00:00Z"
 *                   datetime_finish: "2023-12-31T12:00:00Z"
 *                   url_meet: "https://meet.example.com"
 *               code: 200
 *               status: "success"
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A brief message describing the result.
 *                 mentorings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mentoring'
 *                   description: The list of mentorings associated with the mentor.
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating success.
 *       404:
 *         description: No mentorings found with the specified mentor ID
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "No mentorings found with the specified mentor ID"
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
router.get('/api/v1/mentoring/mentor/:id', checkAuth, checkAuthRole(RoleType.ALL), getMentoringByMentorId);

/**
 * @swagger
 * /api/v1/mentoring/{participantId}/{mentorId}:
 *   get:
 *     summary: Get mentorings by participant and mentor IDs
 *     tags: [Mentoring]
 *     parameters:
 *       - in: path
 *         name: participantId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique identifier of the participant.
 *       - in: path
 *         name: mentorId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique identifier of the mentor.
 *     responses:
 *       200:
 *         description: Mentorings retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Mentorings retrieved successfully for Participant ID: 1 and Mentor ID: 2"
 *               mentorings:
 *                 - mentoring_id: 1
 *                   mentor_id: 2
 *                   participant_id: 1
 *                   title: "Mentoring Title"
 *                   description: "Mentoring Description"
 *                   datetime_start: "2023-12-31T10:00:00Z"
 *                   datetime_finish: "2023-12-31T12:00:00Z"
 *                   url_meet: "https://meet.example.com"
 *               code: 200
 *               status: "success"
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A brief message describing the result.
 *                 mentorings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mentoring'
 *                   description: The list of mentorings associated with the participant and mentor combination.
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating success.
 *       404:
 *         description: No mentorings found with the specified combination
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "No mentorings found with the specified combination"
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
router.get('/api/v1/mentoring/:participantId/:mentorId', checkAuth, checkAuthRole(RoleType.ALL), getMentoringByCombination);

module.exports = router;
