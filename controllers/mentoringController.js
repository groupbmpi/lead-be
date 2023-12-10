const Mentoring = require('../models/mentoring');
const Mentor = require('../models/mentor');

const createMentoring = async (req, res) => {
    try {
        const { mentor_id, participant_id, title, description, datetime_start, datetime_finish } = req.body;

         // Check if datetime_start is earlier than datetime_finish
        if (new Date(datetime_start) >= new Date(datetime_finish)) {
            return res.status(400).json({ message: 'datetime_start must be earlier than datetime_finish' });
        }

        // Check if the mentor with the given mentor_id exists
        const mentor = await Mentor.findByPk(mentor_id);

        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found with the provided mentor_id' });
        }

        // Create the mentoring since the mentor exists
        const newMentoring = await Mentoring.create({ 
            mentor_id, 
            participant_id,
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
        const { mentor_id, participant_id, title, description, datetime_start, datetime_finish } = req.body;
        
        // Check if datetime_start is earlier than datetime_finish
        if (new Date(datetime_start) >= new Date(datetime_finish)) {
            return res.status(400).json({ message: 'datetime_start must be earlier than datetime_finish' });
        }

        // Find the mentoring by its primary key (mentoring_id)
        const mentoring = await Mentoring.findByPk(req.params.id);

        if (!mentoring) {
            return res.status(404).json({ message: 'Mentoring not found' });
        }

        // Update the mentoring with the new values
        await mentoring.update({
            mentor_id,
            participant_id,
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

const getMentoringByMentorId = async (req, res) => {
    try {
        const id = req.params.id;
        const mentorings = await Mentoring.findAll({
            where: { mentor_id: id },
        });
        res.status(200).json({
            message: `Mentorings retrieved successfully for Mentor ID: ${id}`,
            mentorings,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getMentoringByParticipantId = async (req, res) => {
    try {
        const id = req.params.id;
        const mentorings = await Mentoring.findAll({
            where: { participant_id: id },
        });
        res.status(200).json({
            message: `Mentorings retrieved successfully for Participant ID: ${id}`,
            mentorings,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getMentoringByCombination = async (req, res) => {
    try {
        const { participantId, mentorId } = req.params;
    
        // Perform search using both participant_id and mentor_id
        const mentorings = await Mentoring.findAll({
            where: { participant_id: participantId, mentor_id: mentorId },
        });
    
        if (mentorings.length === 0) {
            return res.status(404).json({ message: 'No mentorings found with the specified combination' });
        }
    
        res.status(200).json({
            message: `Mentorings retrieved successfully for Participant ID: ${participantId} and Mentor ID: ${mentorId}`,
            mentorings,
        });
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
    deleteMentoring,
    getMentoringByMentorId,
    getMentoringByParticipantId,
    getMentoringByCombination
};
