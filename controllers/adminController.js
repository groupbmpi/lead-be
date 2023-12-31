const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('./../models/admin');
const { successResponse, errorResponse } = require('./../utils/responseBuilder');

const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 3.1.a Dibuat terbatas hanya untuk email domain @bcf.or.id
        if (!email.endsWith('@bcf.or.id')) {
            return res.status(401).json(errorResponse(401, 'Invalid email'));
        } 

        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin) {
            res.status(409).json(errorResponse(409, 'Admin already exists'));
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            role: 'ADMIN',
        });
        res.status(201).json(successResponse(201, 'Admin created', {
            id: admin.admin_id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
        }));
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
}

const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(successResponse(200, 'Admins found', admins.map((admin) => ({
            id: admin.admin_id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
        }))));
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
}

const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (admin) {
            res.status(200).json(successResponse(200, 'Admin found', {
                id: admin.admin_id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            }));
        } else {
            res.status(404).json(errorResponse(404, 'Admin not found'));
        }
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
}

const updateAdmin = async (req, res) => {
    try {
        const adminData = req.body;
        const admin = await Admin.findByPk(req.params.id);

        if(!admin) res.status(404).json(errorResponse(404, 'Admin not found'));

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await admin.update({
            ...adminData,
            password: hashedPassword || admin.password
        });

        res.status(200).json(successResponse(200, 'Admin updated', {
            id: admin.admin_id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
        }));
        
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (admin) {
            await admin.destroy();
            res.status(200).json(successResponse(200, 'Admin deleted'));
        } else {
            res.status(404).json(errorResponse(404, 'Admin not found'));
        }
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
}


module.exports = { createAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin };