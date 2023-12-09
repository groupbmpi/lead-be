const { Sequelize } = require('sequelize');
const TaskSubmission = require('../models/taskSubmission'); 

// Create Task Submission
const createTaskSubmission = async (req, res) => {
    try {
        console.log(req.body);
        const { task_id, participant_id, submission_url, feedback, status } = req.body;
        const newTaskSubmission = await TaskSubmission.create({
            task_id,
            participant_id,
            submission_url,
            feedback,
            status,
            submission_time: Sequelize.literal('CURRENT_TIMESTAMP') // Use the current timestamp
        });
        res.status(201).json({ message: 'Task submission created', newTaskSubmission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Read All Task Submissions
const getAllTaskSubmissions = async (req, res) => {
    try {
        const taskSubmissions = await TaskSubmission.findAll();
        res.status(200).json(taskSubmissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Read Task Submission by ID
const getTaskSubmissionById = async (req, res) => {
    try {
        const taskSubmission = await TaskSubmission.findByPk(req.params.id);
        if (taskSubmission) {
            res.status(200).json(taskSubmission);
        } else {
            res.status(404).json({ message: 'Task submission not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update Task Submission
const updateTaskSubmission = async (req, res) => {
    try {
        const { task_id, participant_id, submission_url, feedback, status, submission_time } = req.body;

        // Find the task submission by its primary key (submission_id)
        const taskSubmission = await TaskSubmission.findByPk(req.params.id);

        if (!taskSubmission) {
            return res.status(404).json({ message: 'Task submission not found' });
        }

        // Update the task submission with the new values
        await taskSubmission.update({
            task_id,
            participant_id,
            submission_url,
            feedback,
            status,
            submission_time,
        });

        res.status(200).json({ message: 'Task submission updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Delete Task Submission
const deleteTaskSubmission = async (req, res) => {
    try {
        const taskSubmission = await TaskSubmission.findByPk(req.params.id);

        if (taskSubmission) {
            await taskSubmission.destroy();
            res.status(200).json({ message: `Task submission ID:${req.params.id} deleted successfully` });
        } else {
            res.status(404).json({ message: 'Task submission not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllTaskSubmissionByTaskId = async (req, res) => {
    try {
        const taskId = req.params.id; 

        // Find all submission with the specified task_id
        const submissions = await TaskSubmission.findAll({
            where: { task_id: taskId },
        });

        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found with the specified task_id' });
        }

        res.status(200).json({ message: 'Submissions retrieved successfully', submissions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getAllTaskSubmissionByParticipantId = async (req, res) => {
    try {
        const participantId = req.params.id; 

        // Find all tasks with the specified task_id
        const submissions = await TaskSubmission.findAll({
            where: { participant_id: participantId },
        });

        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found with the specified participant_id' });
        }

        res.status(200).json({ message: 'Submissions retrieved successfully', submissions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createTaskSubmission,
    getAllTaskSubmissions,
    getTaskSubmissionById,
    updateTaskSubmission,
    deleteTaskSubmission,
    getAllTaskSubmissionByTaskId,
    getAllTaskSubmissionByParticipantId,
};
