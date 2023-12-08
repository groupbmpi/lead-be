const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { errorResponse, successResponse } = require('../utils/responseBuilder');
require('dotenv').config();

const Mentor = require('../models/mentor');
const Participant = require('../models/participant');
const ParticipantMentor = require('../models/participantsmentors');

// 2.1.a Mentor dapat sign up / sign in dengan memasukkan email yang sudah terdaftar oleh admin sebagai username dan ID Mentor sebagai password
// Create a new mentor
const addNew = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingMentor = await Mentor.findOne({ where: { email } });
        if (existingMentor) {
            res.status(409).json(errorResponse(409, 'Mentor with the same email already exists'));
        } 
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const mentor = await Mentor.create({
            email,
            password: hashedPassword,
            role: 'MENTOR'
        });
        res.status(201).json(successResponse(201, 'Mentor created successfully', mentor));
        
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
};

// Get all mentors
const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.findAll();
        res.status(200).json(successResponse(200, 'Mentors retrieved successfully', mentors));
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
};

const getMentorsByParticipantsId = async (req, res) => {
    try {
      const { participantId } = req.params;
  
      const mentors = await ParticipantMentor.findAll({
        where: { participant_id: participantId },
        include: [
          { model: Mentor, as: 'mentor' },
        ],
      });
  
      const mentorList = mentors.map((mentorData) => mentorData.mentor);
  
      return res.status(200).json(successResponse(200, 'Mentor retrieved successfully', mentorList));
    } catch (error) {
      // Kirim response error
      return res.status(500).json(errorResponse(500, error.message));
    }
  };
  

// Get a mentor by ID
const getMentorById = async (req, res) => {
    try {
        const mentor = await Mentor.findByPk(req.params.id);
        if (mentor) {
            res.status(200).json(successResponse(200, 'Mentor retrieved successfully', mentor));
        } else {
            res.status(404).json(errorResponse(404, 'Mentor not found'));
        }
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
};

// 2.2. Mentor diarahkan ke dalam dashboard profile yang perlu dilengkapi dengan informasi genera
// Update a mentor by ID
const updateMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findByPk(req.params.id);
        if (mentor) {
            await mentor.update(req.body);
            res.status(200).json(successResponse(200, 'Mentor updated successfully'));
        } else {
            res.status(404).json(errorResponse(404, 'Mentor not found'));
        }
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
};

// Delete a mentor by ID
const deleteMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findByPk(req.params.id);
        if (mentor) {
            await mentor.destroy();
            res.status(200).json(successResponse(200, 'Mentor deleted successfully'));
        } else {
            res.status(404).json(errorResponse(404, 'Mentor not found'));
        }
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
};

module.exports = { 
    addNew, 
    getAllMentors, 
    getMentorsByParticipantsId, 
    getMentorById, 
    updateMentor, 
    deleteMentor };
