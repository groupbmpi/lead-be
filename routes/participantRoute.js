const express = require('express');
const router = express.Router();
const {
    createParticipant,
    addPassword,
    checkIfPasswordExist,
    updateParticipant,
    deleteParticipant,
    getParticipant
  } = require('../controllers/participantController');
const { checkAuth, checkAuthRole } = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

/**
 * @swagger
 * tags:
 *  name: Participant
 *  description: Participant management 
 */

/**
 * @swagger
 * /api/v1/participant:
 *   get:
 *     summary: Get participants by filter
 *     description: Retrieve participants based on specified filters
 *     tags: [Participant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: participant_number
 *         schema:
 *           type: string
 *         description: Filter by participant number
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         description: Filter by position
 *       - in: query
 *         name: latest_education
 *         schema:
 *           type: string
 *         description: Filter by latest education
 *       - in: query
 *         name: focus
 *         schema:
 *           type: string
 *         description: Filter by focus
 *       - in: query
 *         name: confirmation_1
 *         schema:
 *           type: string
 *         description: Filter by confirmation 1
 *       - in: query
 *         name: confirmation_2
 *         schema:
 *           type: string
 *         description: Filter by confirmation 2
 *       - in: query
 *         name: confirmation_3
 *         schema:
 *           type: string
 *         description: Filter by confirmation 3
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by email (use only with email parameter)
 *       - in: query
 *         name: mentor_id
 *         schema:
 *           type: string
 *         description: Filter by mentor ID
 *       - in: query
 *         name: mentor_name
 *         schema:
 *           type: string
 *         description: Filter by mentor name (use only with mentor_name parameter)
 *       - in: query
 *         name: instance_id
 *         schema:
 *           type: string
 *         description: Filter by instance ID
 *       - in: query
 *         name: instance_name
 *         schema:
 *           type: string
 *         description: Filter by instance name (use only with instance_name parameter)
 *       - in: query
 *         name: instance_status
 *         schema:
 *           type: string
 *         description: Filter by instance status (use only with instance_status parameter)
 *     responses:
 *       200:
 *         description: Participants retrieved successfully
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
 *                   example: Participants retrieved successfully
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 2
 *                       description: The total number of participants retrieved.
 *                     participants:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           participant_id:
 *                             type: string
 *                             example: 1
 *                             description: The unique identifier of the participant.
 *                           instance_id:
 *                             type: string
 *                             example: 1
 *                             description: The unique identifier of the instance to which the participant belongs.
 *                           participant_number:
 *                             type: string
 *                             example: P12345
 *                             description: The participant number.
 *                           name:
 *                             type: string
 *                             example: John Doe
 *                             description: The name of the participant.
 *                           position:
 *                             type: string
 *                             example: Developer
 *                             description: The position of the participant.
 *                           latest_education:
 *                             type: string
 *                             example: Master's Degree
 *                             description: The latest education level of the participant.
 *                           education_background:
 *                             type: string
 *                             example: Computer Science
 *                             description: The education background of the participant.
 *                           focus:
 *                             type: string
 *                             example: Software Development
 *                             description: The focus area of the participant.
 *                           whatsapp_number:
 *                             type: string
 *                             example: +1234567890
 *                             description: The WhatsApp number of the participant.
 *                           email:
 *                             type: string
 *                             example: john@example.com
 *                             description: The email address of the participant.
 *                           joining_reason:
 *                             type: string
 *                             example: Career advancement
 *                             description: The reason for joining.
 *                           url_id_card:
 *                             type: string
 *                             example: https://example.com/id_card.png
 *                             description: The URL to the participant's ID card.
 *                           url_cv:
 *                             type: string
 *                             example: https://example.com/cv.pdf
 *                             description: The URL to the participant's CV.
 *                           confirmation_1:
 *                             type: string
 *                             example: Confirmed
 *                             description: Confirmation status 1.
 *                           confirmation_2:
 *                             type: string
 *                             example: Pending
 *                             description: Confirmation status 2.
 *                           confirmation_3:
 *                             type: string
 *                             example: Rejected
 *                             description: Confirmation status 3.
 *                           role:
 *                             type: string
 *                             example: PARTICIPANT
 *                             description: The role of the participant.
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 400
 *                   description: The HTTP status code indicating a bad request.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Invalid query parameters field1, field2
 *                   description: A brief message describing the error.
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
 *                   description: The HTTP status code indicating unauthorized access.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *                   description: A brief message describing the error.
 *       404:
 *         description: Participant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating participant not found.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Participant not found
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
router.get('/api/v1/participant', checkAuth, checkAuthRole(RoleType.ALL), getParticipant);

/**
 * @swagger
 * /api/v1/participant:
 *   post:
 *     summary: Create a participant
 *     description: Register a new participant for an instance
 *     tags: [Participant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               instance_id:
 *                 type: string
 *                 description: The unique identifier of the instance to which the participant is registering.
 *               participant_number:
 *                 type: string
 *                 description: The participant's identification number.
 *               name:
 *                 type: string
 *                 description: The name of the participant.
 *               position:
 *                 type: string
 *                 description: The position of the participant.
 *               latest_education:
 *                 type: string
 *                 description: The participant's latest education.
 *               education_background:
 *                 type: string
 *                 description: The participant's education background.
 *               focus:
 *                 type: string
 *                 description: The participant's focus.
 *               whatsapp_number:
 *                 type: string
 *                 description: The participant's WhatsApp number.
 *               email:
 *                 type: string
 *                 description: The participant's email address.
 *               joining_reason:
 *                 type: string
 *                 description: The reason for joining.
 *               url_id_card:
 *                 type: string
 *                 description: The URL of the participant's ID card.
 *               url_cv:
 *                 type: string
 *                 description: The URL of the participant's CV.
 *               confirmation_1:
 *                 type: string
 *                 description: Confirmation 1 details.
 *               confirmation_2:
 *                 type: string
 *                 description: Confirmation 2 details.
 *               confirmation_3:
 *                 type: string
 *                 description: Confirmation 3 details.
 *     responses:
 *       201:
 *         description: Participant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 201
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   example: success
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   example: Participant created
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: object
 *                   properties:
 *                     participant_id:
 *                       type: string
 *                       description: The unique identifier of the created participant.
 *                     instance_id:
 *                       type: string
 *                       description: The unique identifier of the instance to which the participant is registered.
 *                     participant_number:
 *                       type: string
 *                       description: The participant's identification number.
 *                     name:
 *                       type: string
 *                       description: The name of the participant.
 *                     position:
 *                       type: string
 *                       description: The position of the participant.
 *                     latest_education:
 *                       type: string
 *                       description: The participant's latest education.
 *                     education_background:
 *                       type: string
 *                       description: The participant's education background.
 *                     focus:
 *                       type: string
 *                       description: The participant's focus.
 *                     whatsapp_number:
 *                       type: string
 *                       description: The participant's WhatsApp number.
 *                     email:
 *                       type: string
 *                       description: The participant's email address.
 *                     joining_reason:
 *                       type: string
 *                       description: The reason for joining.
 *                     url_id_card:
 *                       type: string
 *                       description: The URL of the participant's ID card.
 *                     url_cv:
 *                       type: string
 *                       description: The URL of the participant's CV.
 *                     confirmation_1:
 *                       type: string
 *                       description: Confirmation 1 details.
 *                     confirmation_2:
 *                       type: string
 *                       description: Confirmation 2 details.
 *                     confirmation_3:
 *                       type: string
 *                       description: Confirmation 3 details.
 *                     role:
 *                       type: string
 *                       description: The role of the participant.
 *       404:
 *         description: Instance is not registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating that the instance is not registered.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Instance is not registered
 *                   description: A brief message describing the error.
 *       500:
 *         description: Failed to create participant
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
 *                   example: Failed to create participant
 *                   description: A brief message describing the error.
 */
router.post('/api/v1/participant', createParticipant);

/**
 * @swagger
 * /api/v1/participant/{id}/password:
 *   get:
 *     summary: Check if participant has a password
 *     description: Check if a participant already has a password.
 *     tags: [Participant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the participant.
 *     responses:
 *       200:
 *         description: Participant password check successful
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
 *                   example: Participant already has a password
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: object
 *                   properties:
 *                     has_password:
 *                       type: boolean
 *                       example: true
 *                       description: Indicates whether the participant has a password.
 *       404:
 *         description: Participant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating participant not found.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Participant not found
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
 *                   example: Failed to check participant password
 *                   description: A brief message describing the error.
 */
router.get('/api/v1/participant/:id/password', checkIfPasswordExist);

/**
 * @swagger
 * /api/v1/participant/password/add:
 *   put:
 *     summary: Add password for participant
 *     description: Add a password for a participant if not already set.
 *     tags: [Participant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: participant@example.com
 *                 description: The email of the participant.
 *               password:
 *                 type: string
 *                 example: mySecurePassword
 *                 description: The password to set for the participant.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Participant password added successfully
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
 *                   example: Participant password added
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: object
 *                   description: Detailed information about the participant after adding the password.
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 400
 *                   description: The HTTP status code indicating a bad request.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Participant already has a password
 *                   description: A brief message describing the error.
 *       404:
 *         description: Participant or Instance not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating participant or instance not found.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Participant not found
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
 *                   example: Failed to update participant password
 *                   description: A brief message describing the error.
 */
router.put('/api/v1/participant/password/add', addPassword);

/**
 * @swagger
 * /api/v1/participant/{id}:
 *   put:
 *     summary: Update participant by ID
 *     description: Update participant details based on the provided ID.
 *     tags: [Participant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the participant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               instance_id:
 *                 type: string
 *               participant_number:
 *                 type: string
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               latest_education:
 *                 type: string
 *               education_background:
 *                 type: string
 *               focus:
 *                 type: string
 *               whatsapp_number:
 *                 type: string
 *               email:
 *                 type: string
 *               joining_reason:
 *                 type: string
 *               url_id_card:
 *                 type: string
 *               url_cv:
 *                 type: string
 *               confirmation_1:
 *                 type: boolean
 *               confirmation_2:
 *                 type: boolean
 *               confirmation_3:
 *                 type: boolean
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Participant updated successfully
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
 *                   example: Participant updated
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: object
 *                   properties:
 *                     participant_id:
 *                       type: string
 *                     instance_id:
 *                       type: string
 *                     participant_number:
 *                       type: string
 *                     name:
 *                       type: string
 *                     position:
 *                       type: string
 *                     latest_education:
 *                       type: string
 *                     education_background:
 *                       type: string
 *                     focus:
 *                       type: string
 *                     whatsapp_number:
 *                       type: string
 *                     email:
 *                       type: string
 *                     joining_reason:
 *                       type: string
 *                     url_id_card:
 *                       type: string
 *                     url_cv:
 *                       type: string
 *                     confirmation_1:
 *                       type: boolean
 *                     confirmation_2:
 *                       type: boolean
 *                     confirmation_3:
 *                       type: boolean
 *                     role:
 *                       type: string
 *       403:
 *         description: Forbidden access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 403
 *                   description: The HTTP status code indicating forbidden access.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Forbidden access
 *                   description: A brief message describing the error.
 *       404:
 *         description: Participant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating participant not found.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Participant not found
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
 *                   example: Failed to update participant
 *                   description: A brief message describing the error.
 */
router.put('/api/v1/participant/:id', checkAuth, checkAuthRole([...RoleType.SUPERADMIN, ...RoleType.PARTICIPANT]), updateParticipant);
// router.delete('/api/v1/participant/:id', checkAuth, deleteParticipant);

/**
 * @swagger
 * /api/v1/participant/{id}:
 *   delete:
 *     summary: Delete participant by ID
 *     description: Delete a participant by their unique identifier.
 *     tags: [Participant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the participant to be deleted.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Participant deleted successfully
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
 *                   example: Participant deleted successfully
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: object
 *                   properties:
 *                     participant_id:
 *                       type: string
 *                       example: abc123
 *                       description: The unique identifier of the deleted participant.
 *                     instance_id:
 *                       type: string
 *                       example: xyz789
 *                       description: The instance identifier of the deleted participant.
 *                     participant_number:
 *                       type: string
 *                       example: P12345
 *                       description: The participant number of the deleted participant.
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                       description: The name of the deleted participant.
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                       description: The email address of the deleted participant.
 *                     role:
 *                       type: string
 *                       example: PARTICIPANT
 *                       description: The role of the deleted participant.
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
 *                   description: The HTTP status code indicating unauthorized access.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Invalid or expired token! Login to continue
 *                   description: A brief message describing the error.
 *       403:
 *         description: Forbidden access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 403
 *                   description: The HTTP status code indicating forbidden access.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Forbidden access
 *                   description: A brief message describing the error.
 *       404:
 *         description: Participant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating participant not found.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Participant not found
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
 *                   example: Failed to delete participant
 *                   description: A brief message describing the error.
 */
router.delete('/api/v1/participant/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), deleteParticipant);

module.exports = router;