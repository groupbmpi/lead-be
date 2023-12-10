const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { successResponse, errorResponse } = require('../utils/responseBuilder');

const Participant = require('../models/participant');
const Mentor = require('../models/mentor');
const ParticipantsMentors = require('../models/participantsmentors');
const Instance = require('../models/instance');

const { Database } = require('../config/db');
const db = Database.getInstance().getSequelizeInstance();

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

        // Check if the instance exists
        const instance = await Instance.findByPk(instance_id);
        if (!instance) {
          return res.status(404).json(errorResponse(404, 'Instance is not registered'));
        }
    
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
    res.status(500).json(errorResponse(500, 'Failed to create participant.'));
  }
};

// Update participant
const updateParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const participantData = req.body;

    // Find the participant
    const participant = await Participant.findByPk(id);

    if (!participant) {
      return res.status(404).json(errorResponse(404, 'Participant not found'));
    }

    // check if the participant is the same with the user
    if (participant.participant_id !== req.userData.id && req.userData.role === 'PARTICIPANT' && req.userData.role !== 'SUPERADMIN') {
        return res.status(403).json(errorResponse(403, 'Forbidden access'));
    }

    // check if participant already has password
    if(participant.password) {
      return res.status(400).json(errorResponse(400, 'Participant already has password'));
    }

    // Hash the password if provided
    let hashedPassword;
    if (participantData.password) {
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
    res.status(500).json(errorResponse(500, `Failed to update participant. ${error.message}`));
  }
};

// check if password is already exist
const checkIfPasswordExist = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the participant
    const participant = await Participant.findByPk(id);
    if (!participant) {
      return res.status(404).json(errorResponse(404, 'Participant not found'));
    }

    // check if participant already has password
    if(participant.password) {
      return res.status(200).json(successResponse(200, 'Participant already has password', { has_password: true }));
    }

    res.status(200).json(successResponse(200, 'Participant does not have password', { has_password: false }));
  } catch (error) {
    res.status(500).json(errorResponse(500, 'Failed to check participant password.'));
  }
}


const addPassword = async (req, res) => {
  try {
    const result = db.transaction(async (t) => {
      // const { id } = req.params;
      const { email, password } = req.body;

      const participant = await Participant.findOne({ where: { email: email } });
      if (!participant) {
        return res.status(404).json(errorResponse(404, 'Participant not found'));
      }

      // const id = participant.participant_id;

      // Find the participant
      // const participant = await Participant.findByPk(id);
      // if (!participant) {
      //   return res.status(404).json(errorResponse(404, 'Participant not found'));
      // }

      // check if participant already has password
      if(participant.password) {
        return res.status(400).json(errorResponse(400, 'Participant already has password'));
      }

      const instance = await Instance.findByPk(participant.instance_id);
      if (!instance) {
        return res.status(404).json(errorResponse(404, 'Instance not found'));
      }

      // check if instance status is LOLOS
      if (instance.status.toUpperCase() !== 'LOLOS') {
        return res.status(400).json(errorResponse(400, 'Your instance status is not "LOLOS". You cannot add password.'));
      }  

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the participant
      await participant.update({ password: hashedPassword }, { transaction: t });

      res.status(200).json(successResponse(200, 'Participant password added', {
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
    res.status(500).json(errorResponse(500, `Failed to update participant password. ${error.message}.`));
  }
}

// Delete participant
const deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the participant
    const participant = await Participant.findByPk(id);

    if (!participant) {
      return res.status(404).json(errorResponse(404, 'Participant not found'));
    }

    // Delete the participant
    const result = await participant.destroy();

    res.status(200).json(successResponse(200, 'Participant deleted successfully', {
      participant_id: participant.participant_id,
      instance_id: participant.instance_id,
      participant_number: participant.participant_number,
      name: participant.name,
      email: participant.email,
      role: participant.role
    }));
  } catch (error) {
    res.status(500).json(errorResponse(500, 'Failed to delete participant'));
  }
};

// Get participants by filter
const getParticipant = async (req, res) => {
  try {
    const filter = req.query;

    const allowedFilterFields = ['participant_number', 'position', 'latest_education', 'focus', 'confirmation_1', 'confirmation_2', 'confirmation_3', 'email', 'mentor_id', 'mentor_name', 'instance_id', 'instance_name', 'instance_status'];
    const filterFields = Object.keys(filter);
    const isFilterInvalid = filterFields.some((field) => !allowedFilterFields.includes(field));

    if (isFilterInvalid) {
      return res.status(400).json(errorResponse(400, `Invalid query params: ${filterFields.join(', ')}`));
    }

    if (filter.email) {
      if (filterFields.length > 1) {
        return res.status(400).json(errorResponse(400, `Invalid query params: ${filterFields.join(', ')}. If you want to search participant by email, please only use email as query params`));
      }
      const participant = await Participant.findOne({ where: { email: filter.email } });
      if (!participant) {
        return res.status(404).json(errorResponse(404, 'Participant not found'));
      }
      return res.status(200).json(successResponse(200, 'Participant retrieved successfully', {
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
    } else if(filter.participant_number || filter.position || filter.latest_education  || filter.focus || filter.confirmation_1 || filter.confirmation_2 || filter.confirmation_3 ) {
      const participants = await Participant.findAll( { where: filter });
      return res.status(200).json(successResponse(200, 'Participants retrieved successfully', {
        total: participants.length,
        participants: participants.map((participant) => ({
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
        }))
      }));
    } else if(filter.mentor_id || filter.mentor_name) {
      const { mentor_id, mentor_name } = filter;
      let mentorId = mentor_id;

      if(!mentor_id && mentor_name) {
        const mentor = await Mentor.findOne({ where: { name: mentor_name } });
        if (!mentor) {
          return res.status(404).json(errorResponse(404, 'Mentor not found'));
        }
        mentorId = mentor.mentor_id;
      }

      
      // Find all participants related to the mentor
      const participants = await ParticipantsMentors.findAll({
        where: { mentor_id: mentorId },
        include: [
          { model: Participant },
        ],
      });
      
      // Extract participant data into an array
      const participantList = participants.map((participantData) => participantData.Participant);

      // Send response containing the participant list
      return res.status(200).json({
        message: 'Successfully retrieved participants',
        data: { total: participantList.length, participants: participantList},
      });
    } else if(filter.instance_id || filter.instance_name || filter.instance_status) {
      const { instance_id, instance_name, instance_status } = filter;
      let instanceId = instance_id;

      if(!instance_id && instance_name) {
        const instance = await Instance.findOne({ where: { name: instance_name } });
        if (!instance) {
          return res.status(404).json(errorResponse(404, 'Instance not found'));
        }
        instanceId = instance.instance_id;
      } else if(!instance_id && instance_status) {
        const instance = await Instance.findOne({ where: { status: instance_status } });
        if (!instance) {
          return res.status(404).json(errorResponse(404, 'Instance not found'));
        }
        instanceId = instance.instance_id;
      }

      // Find all participants related to the instance
      const participants = await Participant.findAll({
        where: { instance_id: instanceId },
      });
      
      // Send response containing the participant list
      return res.status(200).json(successResponse(200, 'Participants retrieved successfully', {
        total: participants.length,
        participants: participants.map((participant) => ({
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
        }))
      }));
    } else {
      const participants = await Participant.findAll();
      return res.status(200).json(successResponse(200, 'Participants retrieved successfully', {
        total: participants.length,
        participants: participants.map((participant) => ({
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
        }))
      }));
    }

  } catch (error) {
    res.status(500).json(errorResponse(500, `Failed to retrieve participants. ${error.message}.`));
  }
};


module.exports = {
  createParticipant,
  checkIfPasswordExist,
  addPassword,
  updateParticipant,
  deleteParticipant,
  getParticipant
};
