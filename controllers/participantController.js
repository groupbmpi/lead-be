const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Participant = require('../models/participant.model');

// Create a participant
const createParticipant = async (req, res) => {
  try {
    const {
      participant_id,
      instance_id,
      participant_number,
      name,
      position,
      latest_education,
      education_background,
      focus,
      whatsapp_number,
      email,
      password,
      joining_reason,
      url_id_card,
      url_cv,
      confirmation_1,
      confirmation_2,
      confirmation_3,
      role
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the participant
    const participant = await Participant.create({
      participant_id,
      instance_id,
      participant_number,
      name,
      position,
      latest_education,
      education_background,
      focus,
      whatsapp_number,
      email,
      password: hashedPassword,
      joining_reason,
      url_id_card,
      url_cv,
      confirmation_1,
      confirmation_2,
      confirmation_3,
      role
    });

    res.status(201).json({
      status: 'success',
      message: 'Participant created',
      data: {
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
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.errors,
      }
    });
  }
};

// Login participant
const loginParticipant = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the participant by email
    const participant = await Participant.findOne({ where: { email } });

    if (!participant) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 404,
          message: 'Participant not found',
        }
      });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, participant.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        error: {
          code: 401,
          message: 'Invalid password',
        }
      });
    }

    // Generate JWT token
    const token = jwt.sign({ participant_id: participant.participant_id }, 'secret');

    res.status(200).json({
      success: true,
      message: 'Login success',
      token,
      user: {
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
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.errors,
      }
    });
  }
};

// Update participant
const updateParticipant = async (req, res) => {
  try {
    const { participant_id } = req.params;
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
      password,
      joining_reason,
      url_id_card,
      url_cv,
      confirmation_1,
      confirmation_2,
      confirmation_3,
      role
    } = req.body;

    // Find the participant
    const participant = await Participant.findByPk(participant_id);

    if (!participant) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 404,
          message: 'Participant not found',
        }
      });
    }

    // Hash the password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update the participant
    await participant.update({
      instance_id,
      participant_number,
      name,
      position,
      latest_education,
      education_background,
      focus,
      whatsapp_number,
      email,
      password: hashedPassword,
      joining_reason,
      url_id_card,
      url_cv,
      confirmation_1,
      confirmation_2,
      confirmation_3,
      role
    });

    res.status(200).json({
      status: 'success',
      message: 'Participant updated',
      data: {
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
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.errors,
      }
    });
  }
};

// Delete participant
const deleteParticipant = async (req, res) => {
  try {
    const { participant_id } = req.params;

    // Find the participant
    const participant = await Participant.findByPk(participant_id);

    if (!participant) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 404,
          message: 'Participant not found',
        }
      });
    }

    // Delete the participant
    await participant.destroy();

    res.status(200).json({
      status: 'success',
      message: 'Participant deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.errors,
      }
    });
  }
};

module.exports = {
  createParticipant,
  loginParticipant,
  updateParticipant,
  deleteParticipant
};
