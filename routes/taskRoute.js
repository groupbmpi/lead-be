const express = require('express');
const router = express.Router();

const { checkAuth, checkAuthRole } = require('../middleware/checkauth');
const RoleType = require('../utils/roleType');

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Task management
 */

/**
 * @swagger
 * /api/v1/task:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentor_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Task created successfully
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
 *                   example: Task created
 *                   description: A brief message describing the result.
 *                 newTask:
 *                   type: object
 *                   properties:
 *                     mentor_id:
 *                       type: integer
 *                       example: 1
 *                       description: The unique identifier of the mentor associated with the task.
 *                     title:
 *                       type: string
 *                       example: 'Task Title'
 *                       description: The title of the task.
 *                     description:
 *                       type: string
 *                       example: 'Task Description'
 *                       description: The description of the task.
 *                     deadline:
 *                       type: string
 *                       format: date-time
 *                       example: '2023-12-31T23:59:59Z'
 *                       description: The deadline for the task.
 *       404:
 *         description: Mentor not found with the provided mentor_id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating a not found error.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: 'Mentor not found with the provided mentor_id'
 *                   description: A brief message describing the error.
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
 *                   example: 'Internal Server Error'
 *                   description: A brief message describing the error.
 */
router.post('/api/v1/task', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), createTask);

/**
 * @swagger
 * /api/v1/task:
 *   get:
 *     summary: Get all tasks
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   task_id:
 *                     type: integer
 *                   mentor_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   deadline:
 *                     type: string
 *                     format: date-time
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
 *                   example: 'Internal Server Error'
 *                   description: A brief message describing the error.
 */
router.get('/api/v1/task', checkAuth, checkAuthRole(RoleType.ALL), getAllTasks);

/**
 * @swagger
 * /api/v1/task/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique identifier of the task.
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task_id:
 *                   type: integer
 *                 mentor_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 deadline:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating a not found error.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: 'Task not found'
 *                   description: A brief message describing the error.
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
 *                   example: 'Internal Server Error'
 *                   description: A brief message describing the error.
 */
router.get('/api/v1/task/:id', checkAuth, checkAuthRole(RoleType.ALL), getTaskById);

/**
 * @swagger
 * /api/v1/task/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique identifier of the task.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentor_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
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
 *                   example: 'Task updated successfully'
 *                   description: A brief message describing the result.
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 404
 *                   description: The HTTP status code indicating a not found error.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: 'Task not found'
 *                   description: A brief message describing the error.
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
 *                   example: 'Internal Server Error'
 *                   description: A brief message describing the error.
 */
router.put('/api/v1/task/:id', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), updateTask);

/**
 * @swagger
 * /api/v1/task/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique identifier of the task.
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               status: success
 *               message: Task ID:1 deleted successfully
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: error
 *               message: Task not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               code: 500
 *               status: error
 *               message: Internal Server Error
 */
router.delete('/api/v1/task/:id', checkAuth, checkAuthRole([...RoleType.ADMINS, ...RoleType.MENTOR]), deleteTask);

module.exports = router;