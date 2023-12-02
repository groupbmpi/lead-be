
const Mentor = require('../models/mentor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
    // Create a new mentor
    createMentor: async (req, res) => {
        try {
            const { name, email } = req.body;
            const existingMentor = await Mentor.findOne({ where: { email } });
            if (existingMentor) {
                res.status(409).json({ message: 'Mentor already exists' });
            } 
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);


            const mentor = await Mentor.create({
                mentor_id: generateMentorId(),
                name,
                email,
                password: hashedPassword,
                role: 'MENTOR'
            });
            res.status(201).json(mentor);
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get all mentors
    getAllMentors: async (req, res) => {
        try {
            const mentors = await Mentor.findAll();
            res.status(200).json(mentors);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get a mentor by ID
    getMentorById: async (req, res) => {
        try {
            const mentor = await Mentor.findByPk(req.params.id);
            if (mentor) {
                res.status(200).json(mentor);
            } else {
                res.status(404).json({ message: 'Mentor not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a mentor by ID
    updateMentor: async (req, res) => {
        try {
            const mentor = await Mentor.findByPk(req.params.id);
            if (mentor) {
                await mentor.update(req.body);
                res.status(200).json({ message: 'Mentor updated successfully' });
            } else {
                res.status(404).json({ message: 'Mentor not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a mentor by ID
    deleteMentor: async (req, res) => {
        try {
            const mentor = await Mentor.findByPk(req.params.id);
            if (mentor) {
                await mentor.destroy();
                res.status(200).json({ message: 'Mentor deleted successfully' });
            } else {
                res.status(404).json({ message: 'Mentor not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Mentor login
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const mentor = await Mentor.findOne({ where: { email } });

            if(!mentor) return res.status(401).json({ message: 'Invalid email or password' });
            
            const isPasswordValid = await bcrypt.compare(password, mentor.password);
            if (isPasswordValid) {
                const token = jwt.sign({ mentorId: mentor.mentor_id }, 'secretKey');
                res.status(200).json({ message: 'Login successful', token });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

function generateMentorId() {
    // Generate mentor ID logic goes here
}