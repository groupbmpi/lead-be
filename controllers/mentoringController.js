const Mentoring = require('../models/mentoring');
const Mentor = require('../models/mentor');

const createMentoring = async (req, res) => {
    try {
        const { mentor_id, title, description, datetime_start, datetime_finish } = req.body;

        // Check if the mentor with the given mentor_id exists
        const mentor = await Mentor.findByPk(mentor_id);

        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found with the provided mentor_id' });
        }

        // Create the mentoring since the mentor exists
        const newMentoring = await Mentoring.create({ 
            mentor_id, 
            title, 
            description, 
            datetime_start,
            datetime_finish
        });

        res.status(201).json({ message: 'Mentoring created', newMentoring });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllMentorings = async (req, res) => {
    try {
        const mentorings = await Mentoring.findAll();
        res.status(200).json(mentorings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getMentoringById = async (req, res) => {
    try {
        const mentoring = await Mentoring.findByPk(req.params.id);
        if (mentoring) {
            res.status(200).json(mentoring);
        } else {
            res.status(404).json({ message: 'Mentoring not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateMentoring = async (req, res) => {
    try {
        const { mentor_id, title, description, datetime_start, datetime_finish } = req.body;
        
        // Find the mentoring by its primary key (mentoring_id)
        const mentoring = await Mentoring.findByPk(req.params.id);

        if (!mentoring) {
            return res.status(404).json({ message: 'Mentoring not found' });
        }

        // Update the mentoring with the new values
        await mentoring.update({
            mentor_id,
            title,
            description,
            datetime_start,
            datetime_finish,
        });

        res.status(200).json({ message: 'Mentoring updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteMentoring = async (req, res) => {
    try {
        const mentoring = await Mentoring.findByPk(req.params.id);

        if (mentoring) {
            await mentoring.destroy();
            res.status(200).json({ message: `Mentoring ID:${req.params.id} deleted successfully` });
        } else {
            res.status(404).json({ message: 'Mentoring not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createMentoring,
    getAllMentorings,
    getMentoringById,
    updateMentoring,
    deleteMentoring
};
