const Task = require('../models/task');
const Mentor = require('../models/mentor'); // Import the Mentor model

const createTask = async (req, res) => {
    try {
        const { mentor_id, title, description, deadline } = req.body;

        // Check if the mentor with the given mentor_id exists
        const mentor = await Mentor.findByPk(mentor_id);

        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found with the provided mentor_id' });
        }

        // Create the task since the mentor exists
        const newTask = await Task.create({ 
            mentor_id, 
            title, 
            description, 
            deadline 
        });

        res.status(201).json({ message: 'Task created', newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { mentor_id, title, description, deadline } = req.body;
        
        console.log(req.params.id);
        console.log(req.body);

        // Find the task by its primary key (task_id)
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update the task with the new values
        await task.update({
            mentor_id,
            title,
            description,
            deadline,
        });

        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (task) {
            await task.destroy();
            res.status(200).json({ message: `Task ID:${req.params.id} deleted successfully` });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
