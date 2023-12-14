const express = require('express');
const router = express.Router();

const { checkAuth, checkAuthRole } = require('./../middleware/checkauth');
const RoleType = require('./../utils/roleType');

const {
  createTaskSubmission,
  getAllTaskSubmissions,
  getTaskSubmissionById,
  updateTaskSubmission,
  deleteTaskSubmission,
  getTaskSubmissionByTaskId,
  getTaskSubmissionByParticipantId,
  getTaskSubmissionByCombination,
} = require('./../controllers/taskSubmissionController');

/**
 * @swagger
 * tags:
 *   name: Task Submission
 *   description: Task Submission management
 */

/**
 * @swagger
 * /api/v1/taskSubmission:
 *   post:
 *     summary: Create a new task submission
 *     tags: [Task Submission]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_id:
 *                 type: integer
 *               participant_id:
 *                 type: integer
 *               submission_url:
 *                 type: string
 *               feedback:
 *                 type: string
 *               status:
 *                 type: string
 *               submission_time:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Task submission created successfully
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
 *                   example: Task submission created
 *                   description: A brief message describing the result.
 *                 newTaskSubmission:
 *                   type: object
 *                   properties:
 *                     task_id:
 *                       type: integer
 *                       description: The unique identifier of the task associated with the submission.
 *                     participant_id:
 *                       type: integer
 *                       description: The unique identifier of the participant submitting the task.
 *                     submission_url:
 *                       type: string
 *                       description: The URL of the task submission.
 *                     feedback:
 *                       type: string
 *                       description: Feedback provided for the task submission.
 *                     status:
 *                       type: string
 *                       description: The status of the task submission.
 *                     submission_time:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the task was submitted.
 *       500:
 *         description: Internal Server Error
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
 *                   example: Internal Server Error
 *                   description: A brief message describing the error.
 */
router.post('/api/v1/taskSubmission', checkAuth, checkAuthRole([...RoleType.PARTICIPANT, ...RoleType.ADMINS, ...RoleType.MENTOR]), createTaskSubmission);

/**
 * @swagger
 * /api/v1/taskSubmission:
 *   get:
 *     summary: Get all task submissions
 *     tags: [Task Submission]
 *     responses:
 *       200:
 *         description: Task submissions found successfully
 *         content:
 *           application/json:
 *             example:
 *               - task_id: 1
 *                 participant_id: 2
 *                 submission_url: "https://example.com/submission"
 *                 feedback: "Well done!"
 *                 status: "approved"
 *                 submission_time: "2023-01-01T12:00:00Z"
 *               - task_id: 2
 *                 participant_id: 3
 *                 submission_url: "https://example.com/another-submission"
 *                 feedback: "Needs improvement."
 *                 status: "pending"
 *                 submission_time: "2023-01-02T15:30:00Z"
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   task_id:
 *                     type: integer
 *                     description: The unique identifier of the task associated with the submission.
 *                   participant_id:
 *                     type: integer
 *                     description: The unique identifier of the participant who submitted the task.
 *                   submission_url:
 *                     type: string
 *                     description: The URL of the submitted task.
 *                   feedback:
 *                     type: string
 *                     description: Any feedback provided for the submission.
 *                   status:
 *                     type: string
 *                     description: The status of the submission (e.g., "approved," "pending").
 *                   submission_time:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the submission was made.
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
router.get('/api/v1/taskSubmission', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), getAllTaskSubmissions);

/**
 * @swagger
 * /api/v1/taskSubmission/{id}:
 *   get:
 *     summary: Get a task submission by ID
 *     tags: [Task Submission]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the task submission.
 *     responses:
 *       200:
 *         description: Task submission found successfully
 *         content:
 *           application/json:
 *             example:
 *               task_id: 1
 *               participant_id: 2
 *               submission_url: "https://example.com/submission"
 *               feedback: "Well done!"
 *               status: "approved"
 *               submission_time: "2023-01-01T12:00:00Z"
 *             schema:
 *               type: object
 *               properties:
 *                 task_id:
 *                   type: integer
 *                   description: The unique identifier of the task associated with the submission.
 *                 participant_id:
 *                   type: integer
 *                   description: The unique identifier of the participant who submitted the task.
 *                 submission_url:
 *                   type: string
 *                   description: The URL of the submitted task.
 *                 feedback:
 *                   type: string
 *                   description: Any feedback provided for the submission.
 *                 status:
 *                   type: string
 *                   description: The status of the submission (e.g., "approved," "pending").
 *                 submission_time:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the submission was made.
 *       404:
 *         description: Task submission not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "Task submission not found"
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
router.get('/api/v1/taskSubmission/:id', checkAuth, checkAuthRole(RoleType.ALL), getTaskSubmissionById);

/**
 * @swagger
 * /api/v1/taskSubmission/{id}:
 *   put:
 *     summary: Update a task submission by ID
 *     tags: [Task Submission]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the task submission.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_id:
 *                 type: integer
 *               participant_id:
 *                 type: integer
 *               submission_url:
 *                 type: string
 *               feedback:
 *                 type: string
 *               status:
 *                 type: string
 *               submission_time:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Task submission updated successfully
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               status: "success"
 *               message: "Task submission updated successfully"
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
 *         description: Task submission not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "Task submission not found"
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
router.put('/api/v1/taskSubmission/:id', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), updateTaskSubmission);

/**
 * @swagger
 * /api/v1/taskSubmission/{id}:
 *   delete:
 *     summary: Delete task submission by ID
 *     tags: [Task Submission]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the task submission to delete.
 *     responses:
 *       200:
 *         description: Task submission deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               status: "success"
 *               message: "Task submission ID:1 deleted successfully"
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
 *         description: Task submission not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "Task submission not found"
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
router.delete('/api/v1/taskSubmission/:id', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), deleteTaskSubmission);

/**
 * @swagger
 * /api/v1/taskSubmission/task/{id}:
 *   get:
 *     summary: Get task submissions by task ID
 *     tags: [Task Submission]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the task to retrieve submissions for.
 *     responses:
 *       200:
 *         description: Submissions retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               status: "success"
 *               message: "Submissions retrieved successfully for Task ID: 1"
 *               submissions:
 *                 - submission_id: 1
 *                   task_id: 1
 *                   participant_id: 1
 *                   submission_url: "https://example.com/submission"
 *                   feedback: "Good work!"
 *                   status: "completed"
 *                   submission_time: "2023-01-01T12:00:00Z"
 *                 # Additional submission objects if applicable
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
 *                 submissions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       submission_id:
 *                         type: number
 *                         description: The unique identifier of the submission.
 *                       task_id:
 *                         type: number
 *                         description: The unique identifier of the associated task.
 *                       participant_id:
 *                         type: number
 *                         description: The unique identifier of the participant who submitted the task.
 *                       submission_url:
 *                         type: string
 *                         description: The URL of the submission.
 *                       feedback:
 *                         type: string
 *                         description: Feedback provided for the submission.
 *                       status:
 *                         type: string
 *                         description: The status of the submission.
 *                       submission_time:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the submission was made.
 *       404:
 *         description: No submissions found with the specified task_id
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "No submissions found with the specified task_id"
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
router.get('/api/v1/taskSubmission/task/:id', checkAuth, checkAuthRole(RoleType.ALL), getTaskSubmissionByTaskId);

/**
 * @swagger
 * /api/v1/taskSubmission/participant/{id}:
 *   get:
 *     summary: Get task submissions by participant ID
 *     tags: [Task Submission]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the participant to retrieve task submissions for.
 *     responses:
 *       200:
 *         description: Task submissions found successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Submissions retrieved successfully for Participant ID: 1"
 *               submissions:
 *                 - submission_id: 1
 *                   task_id: 1
 *                   participant_id: 1
 *                   submission_url: "https://example.com/submission"
 *                   feedback: "Good job!"
 *                   status: "completed"
 *                   submission_time: "2023-12-31T23:59:59Z"
 *               code: 200
 *               status: "success"
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A brief message describing the result.
 *                 submissions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TaskSubmission'
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating success.
 *       404:
 *         description: No submissions found with the specified participant_id
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "No submissions found with the specified participant_id"
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
router.get('/api/v1/taskSubmission/participant/:id', checkAuth, checkAuthRole(RoleType.ALL), getTaskSubmissionByParticipantId);

/**
 * @swagger
 * /api/v1/taskSubmission/{participantId}/{taskId}:
 *   get:
 *     summary: Get task submissions by participant and task ID combination
 *     tags: [Task Submission]
 *     parameters:
 *       - in: path
 *         name: participantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the participant to retrieve task submissions for.
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the task to retrieve submissions for.
 *     responses:
 *       200:
 *         description: Task submissions found successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Submissions retrieved successfully for Participant ID: 1 and Task ID: 1"
 *               submissions:
 *                 - submission_id: 1
 *                   task_id: 1
 *                   participant_id: 1
 *                   submission_url: "https://example.com/submission"
 *                   feedback: "Good job!"
 *                   status: "completed"
 *                   submission_time: "2023-12-31T23:59:59Z"
 *               code: 200
 *               status: "success"
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A brief message describing the result.
 *                 submissions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TaskSubmission'
 *                 code:
 *                   type: number
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   description: The status of the response indicating success.
 *       404:
 *         description: No submissions found with the specified combination
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: "error"
 *               message: "No submissions found with the specified combination"
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
router.get('/api/v1/taskSubmission/:participantId/:taskId', checkAuth, checkAuthRole(RoleType.ALL), getTaskSubmissionByCombination);

module.exports = router;
