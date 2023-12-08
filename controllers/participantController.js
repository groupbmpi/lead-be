const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { successResponse, errorResponse } = require('../utils/responseBuilder');

const Participant = require('../models/participant');

// Create a participant
const createParticipant = async (req, res) => {
  try {
    const result = db.transaction(async (t) => {
      const {
          instance_id,
          participant_number,
          name,
          position,
          latest_education,
          education_background,
          focus,
          whatsapp_number,
          email,
          joining_reason,
          url_id_card,
          url_cv,
          confirmation_1,
          confirmation_2,
          confirmation_3,
        } = req.body;
    
        // Create the participant
        const participant = await Participant.create({
          instance_id,
          participant_number,
          name,
          position,
          latest_education,
          education_background,
          focus,
          whatsapp_number,
          email,
          joining_reason,
          url_id_card,
          url_cv,
          confirmation_1,
          confirmation_2,
          confirmation_3,
        }, { transaction: t });
    
        res.status(201).json(successResponse(201, 'Participant created', {
          participant_id: participant.participant_id,
          instance_id: participant.instance_id,
          participant_number: participant.participant_number,
          name: participant.name,
          position: participant.position,
          latest_education: participant.latest_education,
          education_background: participant.education_background,
          focus: participant.focus,
          whatsapp_number: participant.whatsapp_number,
          email: participant.email,
          joining_reason: participant.joining_reason,
          url_id_card: participant.url_id_card,
          url_cv: participant.url_cv,
          confirmation_1: participant.confirmation_1,
          confirmation_2: participant.confirmation_2,
          confirmation_3: participant.confirmation_3,
          role: participant.role
        }));
    });
  } catch (error) {
    res.status(500).json(errorResponse(500, `Failed to create participant.`));
  }
};

// Update participant
const updateParticipant = async (req, res) => {
  try {
    const { participant_id } = req.params;
    const participantData = req.body;

    // Find the participant
    const participant = await Participant.findByPk(participant_id);

    if (!participant) {
      return res.status(404).json(errorResponse(404, 'Participant not found'));
    }

    // Hash the password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update the participant
    await participant.update({
      ...participantData,
      password: hashedPassword || participant.password
    })

    res.status(200).json(successResponse(200, 'Participant updated', {
      participant_id: participant.participant_id,
      instance_id: participant.instance_id,
      participant_number: participant.participant_number,
      name: participant.name,
      position: participant.position,
      latest_education: participant.latest_education,
      education_background: participant.education_background,
      focus: participant.focus,
      whatsapp_number: participant.whatsapp_number,
      email: participant.email,
      joining_reason: participant.joining_reason,
      url_id_card: participant.url_id_card,
      url_cv: participant.url_cv,
      confirmation_1: participant.confirmation_1,
      confirmation_2: participant.confirmation_2,
      confirmation_3: participant.confirmation_3,
      role: participant.role
    }));
  } catch (error) {
    res.status(500).json(errorResponse(500, 'Failed to update participant.'));
  }
};

const addPassword = async (req, res) => {
  try {
    const { participant_id } = req.params;
    const { password } = req.body;

    // Find the participant
    const participant = await Participant.findByPk(participant_id);

    if (!participant) {
      return res.status(404).json(errorResponse(404, 'Participant not found'));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the participant
    await participant.update({ password: hashedPassword });

    res.status(200).json(successResponse(200, 'Participant password added', {
      participant_id: participant.participant_id,
      instance_id: participant.instance_id,
      participant_number: participant.participant_number,
      name: participant.name,
      position: participant.position,
      latest_education: participant.latest_education,
      education_background: participant.education_background,
      focus:participant.focus,
      whatsapp_number: participant.whatsapp_number,
      email: participant.email,
      joining_reason: participant.joining_reason,
      url_id_card: participant.url_id_card,
      url_cv: participant.url_cv,
      confirmation_1: participant.confirmation_1,
      confirmation_2: participant.confirmation_2,
      confirmation_3: participant.confirmation_3,
      role: participant.role
    }));
  } catch (error) {
    res.status(500).json(errorResponse(500, 'Failed to update participant password.'));
  }
}

// Delete participant
const deleteParticipant = async (req, res) => {
  try {
    const { participant_id } = req.params;

    // Find the participant
    const participant = await Participant.findByPk(participant_id);

    if (!participant) {
      return res.status(404).json(errorResponse(404, 'Participant not found'));
    }

    // Delete the participant
    await participant.destroy();

    res.status(200).json(successResponse(200, 'Participant deleted successfully'));
  } catch (error) {
    res.status(500).json(errorResponse(500, 'Failed to delete participant'));
  }
};

const getParticipantsByMentorId = async (req, res) => {
  try {
    const { mentorId } = req.params;

    // Cari semua peserta yang terkait dengan mentor tersebut
    const participants = await ParticipantsMentors.findAll({
      where: { mentor_id: mentorId },
      include: [
        { model: Participant, as: 'participant' },
      ],
    });

    // Extract data peserta menjadi array
    const participantList = participants.map((participantData) => participantData.participant);

    // Kirim response yang berisi list peserta
    return res.status(200).json({
      message: 'Berhasil mendapatkan peserta',
      data: participantList,
    });
  } catch (error) {
    // Kirim response error
    return res.status(500).json({ message: 'Gagal mendapatkan peserta', error });
  }
};


// Get all participants
const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.findAll();
    res.status(200).json(successResponse(200, 'Participants retrieved successfully', participants));
  } catch (error) {
    res.status(500).json(errorResponse(500, 'Failed to retrieve participants'));
  }
};

// Get participant by ID
const getParticipantById = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findByPk(id);
    if (!participant) {
      return res.status(404).json(errorResponse(404, 'Participant not found'));
    }
    res.status(200).json(successResponse(200, 'Participant retrieved successfully', participant));
  } catch (error) {
    res.status(500).json(errorResponse(500, 'Failed to retrieve participant'));
  }
};

module.exports = {
  createParticipant,
  addPassword,
  updateParticipant,
  deleteParticipant,
  getAllParticipants,
  getParticipantsByMentorId,
  getParticipantById
};
