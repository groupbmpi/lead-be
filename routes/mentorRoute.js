const express = require('express');
const router = express.Router();

const {checkAuth, checkAuthRole} = require('./../middleware/checkauth');
const RoleType = require('./../utils/roleType');

const { 
    addNew,
    // getAllMentors,
    getMentor,
    getMentorById,
    updateMentor,
    deleteMentor
} = require('./../controllers/mentorController');

/**
 * @swagger
 * tags:
 *  name: Mentor
 *  description: Mentor management
 */ 

/**
 * @swagger
 * /api/v1/mentor:
 *   post:
 *     summary: Create a new mentor
 *     description: Create a new mentor with the provided information.
 *     tags: [Mentor]
 *     security:
 *       - bearerAuth: []
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
 *                 description: The email address of the new mentor.
 *               name:
 *                 type: string
 *                 description: The name of the new mentor.
 *               password:
 *                 type: string
 *                 description: The password for the new mentor.
 *               category:
 *                 type: string
 *                 description: The category of expertise of the new mentor.
 *               mentor_id_bcf:
 *                 type: string
 *                 description: The mentor_id_bcf of the new mentor.
 *     responses:
 *       201:
 *         description: Mentor created successfully
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
 *                   example: Mentor created successfully
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: object
 *                   properties:
 *                     mentor_id:
 *                       type: string
 *                       example: 123456
 *                       description: The unique identifier of the newly created mentor.
 *                     mentor_id_bcf:
 *                       type: string
 *                       example: 789012
 *                       description: The mentor_id_bcf of the newly created mentor.
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                       description: The name of the mentor.
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                       description: The email address of the mentor.
 *                     category:
 *                       type: string
 *                       example: Technology
 *                       description: The category of expertise of the mentor.
 *                     birthdate:
 *                       type: string
 *                       format: date
 *                       example: 1990-01-01
 *                       description: The birthdate of the mentor.
 *                     gender:
 *                       type: string
 *                       example: Male
 *                       description: The gender of the mentor.
 *                     phone_number:
 *                       type: string
 *                       example: +1234567890
 *                       description: The phone number of the mentor.
 *                     education_background:
 *                       type: string
 *                       example: Computer Science
 *                       description: The educational background of the mentor.
 *                     position:
 *                       type: string
 *                       example: Software Engineer
 *                       description: The current position of the mentor.
 *                     current_workplace:
 *                       type: string
 *                       example: ABC Tech
 *                       description: The current workplace of the mentor.
 *                     url_picture:
 *                       type: string
 *                       example: http://example.com/picture.jpg
 *                       description: The URL of the mentor's profile picture.
 *                     role:
 *                       type: string
 *                       example: MENTOR
 *                       description: The role of the mentor.
 *       401:
 *         description: Invalid or expired token! Login to continue
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
 *       409:
 *         description: Mentor with the same email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 409
 *                   description: The HTTP status code indicating a conflict.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Mentor with the same email already exists
 *                   description: A brief message describing the conflict.
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
router.post('/api/v1/mentor', checkAuth, checkAuthRole(RoleType.SUPERADMIN), addNew);


/**
 * @swagger
 * /api/v1/mentor:
 *   get:
 *     summary: Get mentor by filter
 *     description: Retrieve mentors based on specified filters (email, category, gender, position, participant_id, participant_name, participant_email).
 *     tags: [Mentor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter mentors by email address.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter mentors by category.
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *         description: Filter mentors by gender.
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         description: Filter mentors by position.
 *       - in: query
 *         name: participant_id
 *         schema:
 *           type: integer
 *         description: Filter mentors by participant_id.
 *       - in: query
 *         name: participant_name
 *         schema:
 *           type: string
 *         description: Filter mentors by participant_name. If used, participant_id will be auto-resolved.
 *       - in: query
 *         name: participant_email
 *         schema:
 *           type: string
 *         description: Filter mentors by participant_email. If used, participant_id will be auto-resolved.
 *     responses:
 *       200:
 *         description: Mentors retrieved successfully
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
 *                   example: Mentors retrieved successfully
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 2
 *                       description: The total number of mentors matching the filters.
 *                     mentors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           mentor_id:
 *                             type: string
 *                             example: 123456
 *                             description: The unique identifier of the mentor.
 *                           name:
 *                             type: string
 *                             example: John Doe
 *                             description: The name of the mentor.
 *                           email:
 *                             type: string
 *                             example: john.doe@example.com
 *                             description: The email address of the mentor.
 *                           category:
 *                             type: string
 *                             example: Technology
 *                             description: The category of expertise of the mentor.
 *                           birthdate:
 *                             type: string
 *                             format: date
 *                             example: 1990-01-01
 *                             description: The birthdate of the mentor.
 *                           gender:
 *                             type: string
 *                             example: Male
 *                             description: The gender of the mentor.
 *                           phone_number:
 *                             type: string
 *                             example: +1234567890
 *                             description: The phone number of the mentor.
 *                           education_background:
 *                             type: string
 *                             example: Computer Science
 *                             description: The educational background of the mentor.
 *                           position:
 *                             type: string
 *                             example: Software Engineer
 *                             description: The current position of the mentor.
 *                           current_workplace:
 *                             type: string
 *                             example: ABC Tech
 *                             description: The current workplace of the mentor.
 *                           url_picture:
 *                             type: string
 *                             example: http://example.com/picture.jpg
 *                             description: The URL of the mentor's profile picture.
 *                           role:
 *                             type: string
 *                             example: MENTOR
 *                             description: The role of the mentor.
 *       400:
 *         description: Invalid query params
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
 *                   example: Invalid query params field1, field2
 *                   description: A brief message describing the error.
 *       404:
 *         description: Mentor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating not found.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Mentor not found
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
router.get('/api/v1/mentor', checkAuth, checkAuthRole(RoleType.ALL), getMentor);

/**
 * @swagger
 * /api/v1/mentor/{id}:
 *   get:
 *     summary: Get a mentor by ID
 *     description: Retrieve detailed information about a mentor based on their ID.
 *     tags: [Mentor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the mentor.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mentor retrieved successfully
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
 *                   example: Mentor retrieved successfully
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: object
 *                   properties:
 *                     mentor_id:
 *                       type: string
 *                       example: 1
 *                       description: The unique identifier of the mentor.
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                       description: The name of the mentor.
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                       description: The email address of the mentor.
 *                     category:
 *                       type: string
 *                       example: Technology
 *                       description: The category or field of expertise of the mentor.
 *                     birthdate:
 *                       type: string
 *                       format: date
 *                       example: 1990-01-01
 *                       description: The birthdate of the mentor.
 *                     gender:
 *                       type: string
 *                       example: Male
 *                       description: The gender of the mentor.
 *                     phone_number:
 *                       type: string
 *                       example: +1234567890
 *                       description: The phone number of the mentor.
 *                     education_background:
 *                       type: string
 *                       example: Computer Science
 *                       description: The educational background of the mentor.
 *                     position:
 *                       type: string
 *                       example: Software Engineer
 *                       description: The current job position of the mentor.
 *                     current_workplace:
 *                       type: string
 *                       example: ABC Tech
 *                       description: The current workplace of the mentor.
 *                     url_picture:
 *                       type: string
 *                       example: http://example.com/profile.jpg
 *                       description: The URL of the mentor's profile picture.
 *                     role:
 *                       type: string
 *                       example: MENTOR
 *                       description: The role of the mentor (e.g., MENTOR).
 *       404:
 *         description: Mentor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating that the mentor was not found.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Mentor not found
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
router.get('/api/v1/mentor/:id', checkAuth, checkAuthRole(RoleType.ALL), getMentorById);

/**
 * @swagger
 * /api/v1/mentor/{id}:
 *   put:
 *     summary: Update mentor by ID
 *     description: Update the information of a mentor by their unique identifier.
 *     tags: [Mentor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               category:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: ['Male', 'Female', 'Other']
 *               phone_number:
 *                 type: string
 *               education_background:
 *                 type: string
 *               position:
 *                 type: string
 *               current_workplace:
 *                 type: string
 *               url_picture:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mentor updated successfully
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
 *                   example: Mentor updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     mentor_id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     category:
 *                       type: string
 *                     birthdate:
 *                       type: string
 *                       format: date
 *                     gender:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     education_background:
 *                       type: string
 *                     position:
 *                       type: string
 *                     current_workplace:
 *                       type: string
 *                     url_picture:
 *                       type: string
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
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Forbidden access
 *       404:
 *         description: Mentor not found
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
 *                   example: Mentor not found
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
router.put('/api/v1/mentor/:id', checkAuth, checkAuthRole([...RoleType.MENTOR, ...RoleType.SUPERADMIN]), updateMentor);

/**
 * @swagger
 * /api/v1/mentor/{id}:
 *   delete:
 *     summary: Delete a mentor by ID
 *     description: Delete a mentor based on the provided ID.
 *     tags: [Mentor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the mentor to be deleted.
 *     responses:
 *       200:
 *         description: Mentor deleted successfully
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
 *                   example: Mentor deleted successfully
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: object
 *                   properties:
 *                     mentor_id:
 *                       type: string
 *                       example: 12345
 *                       description: The unique identifier of the deleted mentor.
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                       description: The name of the deleted mentor.
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                       description: The email of the deleted mentor.
 *                     role:
 *                       type: string
 *                       example: MENTOR
 *                       description: The role of the deleted mentor.
 *       404:
 *         description: Mentor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating that the mentor was not found.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Mentor not found
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
router.delete('/api/v1/mentor/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), deleteMentor);

// Export the router
module.exports = router;