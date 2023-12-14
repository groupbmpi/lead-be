const Mentoring = require('./../models/mentoring');
const Mentor = require('./../models/mentor');
const Participant = require('./../models/participant');

const createMentoring = async (req, res) => {
    try {
        const { mentor_id, participant_id, title, description, datetime_start, datetime_finish, url_meet } = req.body;

        // Check if the mentor with the given mentor_id exists
        const mentor = await Mentor.findByPk(mentor_id);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found with the provided mentor_id' });
        }

        // Check if the participant with the given participant_id exists
        const participant = await Participant.findByPk(participant_id);
        if (!participant) {
            return res.status(404).json({ message: 'Participant not found with the provided participant_id' });
        }

        // Create the mentoring since both mentor and participant exist
        const newMentoring = await Mentoring.create({
            mentor_id,
            participant_id,
            title,
            description,
            datetime_start,
            datetime_finish,
            url_meet,
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
        const { mentor_id, participant_id, title, description, datetime_start, datetime_finish, url_meet } = req.body;

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
            url_meet,
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
