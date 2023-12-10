const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { errorResponse, successResponse } = require('../utils/responseBuilder');
require('dotenv').config();

const ParticipantMentor = require('../models/participantsmentors');
const Mentor = require('../models/mentor');
const Participant = require('../models/participant');

/**
 * Create a new mentor
 * @param {object} req.body - The mentor details.
 * @param {string} req.body.email - The email address of the new mentor.
 * @param {string} req.body.password - The password for the new mentor.
 * @returns {object} - The newly created mentor details.
 */
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
        res.status(201).json(successResponse(201, 'Mentor created successfully', {
            mentor_id: mentor.mentor_id,
            name: mentor.name,
            email: mentor.email,
            category: mentor.category,
            birthdate: mentor.birthdate,
            gender: mentor.gender,
            phone_number: mentor.phone_number,
            education_background: mentor.education_background,
            position: mentor.position,
            current_workplace: mentor.current_workplace,
            url_picture: mentor.url_picture,
            role: mentor.role,
        }));
        
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
};


/**
 * Get mentor by filter
 * @param {object} req.query - The filter parameters.
 * @param {string} [req.query.email] - Filter mentors by email address.
 * @param {string} [req.query.category] - Filter mentors by category.
 * @param {string} [req.query.gender] - Filter mentors by gender.
 * @param {string} [req.query.position] - Filter mentors by position.
 * @param {number} [req.query.participant_id] - Filter mentors by participant_id.
 * @param {string} [req.query.participant_name] - Filter mentors by participant_name. If used, participant_id will be auto-resolved.
 * @param {string} [req.query.participant_email] - Filter mentors by participant_email. If used, participant_id will be auto-resolved.
 * @returns {object} - The list of mentors matching the filters.
 */
const getMentor = async (req, res) => {
    try {
        const filter = req.query;

        const allowedFilterFields = [
            'email',
            'category',
            'gender',
            'position',
            'participant_id',
            'participant_name',
            'participant_email',
        ];
        const filterFields = Object.keys(filter);
        const isFilterInvalid = filterFields.some((field) => !allowedFilterFields.includes(field));

        if (isFilterInvalid) {
            return res
                .status(400)
                .json(errorResponse(400, `Invalid query params: ${filterFields.join(', ')}`));
        }

        if (filter.email) {
            if (filterFields.length > 1) {
              return res.status(400).json(errorResponse(400, `Invalid query params: ${filterFields.join(', ')}. If you want to search mentor by email, please only use email as query params`));
            }
            const mentor = await Mentor.findOne({ where: { email: filter.email } });
            return res.status(200).json(successResponse(200, 'Mentor retrieved successfully', {
                mentor_id: mentor.mentor_id,
                name: mentor.name,
                email: mentor.email,
                category: mentor.category,
                birthdate: mentor.birthdate,
                gender: mentor.gender,
                phone_number: mentor.phone_number,
                education_background: mentor.education_background,
                position: mentor.position,
                current_workplace: mentor.current_workplace,
                url_picture: mentor.url_picture,
                role: mentor.role,
            }));
          } else if(filter.category || filter.gender || filter.position) {
            const mentorList = await Mentor.findAll({ where: filter });
            return res.status(200).json(successResponse(200, 'Mentors retrieved successfully', {
            total: mentorList.length,
            mentors: mentorList.map((mentor) => ({
                mentor_id: mentor.mentor_id,
                name: mentor.name,
                email: mentor.email,
                category: mentor.category,
                birthdate: mentor.birthdate,
                gender: mentor.gender,
                phone_number: mentor.phone_number,
                education_background: mentor.education_background,
                position: mentor.position,
                current_workplace: mentor.current_workplace,
                url_picture: mentor.url_picture,
                role: mentor.role,
            }))}));
          } else if(filter.participant_id || filter.participant_name || filter.participant_email) {
            
            const { participant_id, participant_name, participant_email } = filter;
            let participantId = participant_id;
      
            if(!participant_id && participant_name) {
              const participant = await Participant.findOne({ where: { name: participant_name } });
              if (!participant) {
                return res.status(404).json(errorResponse(404, 'Participant not found'));
              }
              participantId = participant.participant_id;
            }

            if(!participant_id && participant_email) {
                const participant = await Participant.findOne({ where: { email: participant_email } });
                if (!participant) {
                    return res.status(404).json(errorResponse(404, 'Participant not found'));
                }
                participantId = participant.participant_id;
            }

            const mentors = await ParticipantMentor.findAll({
                where: { participant_id: participantId },
                include: [
                  { model: Mentor },
                ],
              });
          
            const mentorList = mentors.map((mentorData) => mentorData.Mentor);
        
            return res.status(200).json(successResponse(200, 'Mentor retrieved successfully', {
              total: mentorList.length,
              mentors: mentorList.map((mentor) => ({
                  mentor_id: mentor.mentor_id,
                  name: mentor.name,
                  email: mentor.email,
                  category: mentor.category,
                  birthdate: mentor.birthdate,
                  gender: mentor.gender,
                  phone_number: mentor.phone_number,
                  education_background: mentor.education_background,
                  position: mentor.position,
                  current_workplace: mentor.current_workplace,
                  url_picture: mentor.url_picture,
                  role: mentor.role,
              }))}
            ));
        } else {
            const mentors = await Mentor.findAll();
            res.status(200).json(successResponse(200, 'Mentors retrieved successfully', {
                total: mentors.length,
                mentors: mentors.map((mentor) => ({
                  mentor_id: mentor.mentor_id,
                  name: mentor.name,
                  email: mentor.email,
                  category: mentor.category,
                  birthdate: mentor.birthdate,
                  gender: mentor.gender,
                  phone_number: mentor.phone_number,
                  education_background: mentor.education_background,
                  position: mentor.position,
                  current_workplace: mentor.current_workplace,
                  url_picture: mentor.url_picture,
                  role: mentor.role,
                }))
            }));
        }
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message + ' ' + error.stack));
    }
};

// Get a mentor by ID
const getMentorById = async (req, res) => {
    try {
        const mentor = await Mentor.findByPk(req.params.id);
        if (mentor) {
            res.status(200).json(successResponse(200, 'Mentor retrieved successfully', {
                mentor_id: mentor.mentor_id,
                name: mentor.name,
                email: mentor.email,
                category: mentor.category,
                birthdate: mentor.birthdate,
                gender: mentor.gender,
                phone_number: mentor.phone_number,
                education_background: mentor.education_background,
                position: mentor.position,
                current_workplace: mentor.current_workplace,
                url_picture: mentor.url_picture,
                role: mentor.role,
            }));
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
        
        if(!mentor) return res.status(404).json(errorResponse(404, 'Mentor not found'));

        // check if the mentor is the same with the user
        if (mentor.mentor_id !== req.userData.id && req.userData.role === 'MENTOR' && req.userData.role !== 'SUPERADMIN')
            return res.status(403).json(errorResponse(403, 'Forbidden access'));
        

        const updatedMentor = await mentor.update(req.body);
        res.status(200).json(successResponse(200, 'Mentor updated successfully', {
            mentor_id: updatedMentor.mentor_id,
            name: updatedMentor.name,
            email: updatedMentor.email,
            category: updatedMentor.category,
            birthdate: updatedMentor.birthdate,
            gender: updatedMentor.gender,
            phone_number: updatedMentor.phone_number,
            education_background: updatedMentor.education_background,
            position: updatedMentor.position,
            current_workplace: updatedMentor.current_workplace,
            url_picture: updatedMentor.url_picture,
            role: updatedMentor.role,
        }));
                
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
            res.status(200).json(successResponse(200, 'Mentor deleted successfully', {
                mentor_id: mentor.mentor_id,
                name: mentor.name,
                email: mentor.email,
                role: mentor.role,
            }));
        } else {
            res.status(404).json(errorResponse(404, 'Mentor not found'));
        }
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
};

module.exports = { 
    addNew, 
    getMentor, 
    // getMentorsByParticipantsId, 
    getMentorById, 
    updateMentor, 
    deleteMentor };
