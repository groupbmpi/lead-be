const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Mentor = require('../models/mentor');
const Participant = require('../models/participant');
const Admin = require('../models/admin');
const { errorResponse, successResponse } = require('../utils/responseBuilder');
require('dotenv').config();

// 2.1.b Mentor dapat sign up / sign in dengan memasukkan email yang sudah terdaftar oleh admin sebagai username dan ID Mentor sebagai password
// Login controller
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        let user;
        let role;

        // 3.1.b Dibuat terbatas hanya untuk email domain @bcf.or.id 
        if (email.endsWith('@bcf.or.id')) {
            user = await Admin.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json(errorResponse(401, 'Invalid email or password'));
            }
            role = user.role;
        } else {
            return res.status(401).json(errorResponse(401, 'Invalid email.'));
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json(errorResponse(401, 'Invalid email or password'));
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.admin_id, role }, process.env.JWT_SECRET);

        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true });

        res.json(successResponse('Login successful', { token, user: {
            id: user.admin_id,
            name: user.name,
            email: user.email,
            role: user.role,
        } }));
    } catch (error) {
        res.status(500).json(errorResponse(500, `Internal server error. ${error}`));
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        let user;
        let role;
        
        // Check if the user exists
        const mentor = await Mentor.findOne({ where: { email } });
        const participant = await Participant.findOne({ where: { email } });
        
        if (!mentor && !participant) {
            return res.status(401).json(errorResponse(401, 'Invalid email or password'));
        }
        
        if (mentor) {
            user = mentor;
            role = 'MENTOR';
        } else if (participant) {
            user = participant;
            role = 'PARTICIPANT';
        } else {
            return res.status(401).json(errorResponse(401, 'Invalid email or password'));
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json(errorResponse(401, 'Invalid email or password'));
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.mentor_id || user.participant_id || user.admin_id, role }, process.env.JWT_SECRET);

        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true });

        res.json(successResponse( 200, 'Login successful', { token, user: {
            id: user.mentor_id || user.participant_id || user.admin_id,
            name: user.name,
            email: user.email,
            role,
        }}));
    } catch (error) {
        res.status(500).json(errorResponse(500, `Internal server error. ${error}`));
    }
}

// Logout route
const logout = (req, res) => {
    try {
        if (req.cookies && req.cookies.token) {
            res.clearCookie('token');
            console.log('Logout successful');
            res.status(205).json(successResponse(205, 'Logout successful'));
        } else {
            console.log('No token cookie found');
            res.status(400).json(errorResponse(400, 'No token cookie found. You are not logged in'));
        }
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json(errorResponse(500, `Internal server error. ${error}`));
    }
};

// Me route
const me = async (req, res, next) => {
    try {
        // Get the token from the cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json(errorResponse(401, 'Unauthorized'));
        }

        // Verify the token
        const { userId, role } = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID based on the role
        let user;
        switch (role.toUpperCase()) {
            case 'MENTOR':
                user = await Mentor.findById(userId);
                break;
            case 'PARTICIPANT':
                user = await Participant.findById(userId);
                break;
            case 'ADMIN':
            case 'SUPERADMIN':
                user = await Admin.findByPk(userId);
                break;
            default:
                return res.status(400).json(errorResponse(400, 'Invalid role'));
        }
        if (!user) {
            return res.status(404).json(errorResponse(404, 'User not found'));
        }

        res.status(200).json(successResponse(200, "Berhasil", {  id: user.mentor_id || user.participant_id || user.admin_id, name: user.name, email: user.email, role: user.role }));
    } catch (error) {
        res.status(500).json(errorResponse(500, `Internal server error. ${error}`));
    }
};

module.exports = { loginAdmin, login, logout, me };
