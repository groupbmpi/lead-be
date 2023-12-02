const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');

const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin) {
            res.status(409).json({ 
                success: false,
                error: {
                    code: 409,
                    message: 'Admin already exists',
                }
             });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            role: 'ADMIN',
        });
        res.status(201).json({
            status: 'success',
            message: 'Admin created',
            data: {
                id: admin.admin_id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
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
}

const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json({
            status: 'success',
            message: 'Admins found',
            data: admins.map((admin) => ({
                id: admin.admin_id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            })),
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
}

const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (admin) {
            res.status(200).json({
                status: 'success',
                message: 'Admin found',
                data: {
                    id: admin.admin_id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                },
            });
        } else {
            res.status(404).json({ 
                success: false,
                error: {
                    code: 404,
                    message: 'Admin not found',
                }
             });
        }
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
}

const updateAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const admin = await Admin.findByPk(req.params.id);

        if(!admin) res.status(404).json({
            success: false,
            error: {
                code: 404,
                message: 'Admin not found',
            }
        });

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await admin.update({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(200).json({
            status: 'success',
            message: 'Admin updated',
            data: {
                id: admin.admin_id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
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
}

const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (admin) {
            await admin.destroy();
            res.status(200).json({
                status: 'success', 
                message: 'Admin deleted',
            });
        } else {
            res.status(404).json({ 
                success: false,
                error: {
                    code: 404,
                    message: 'Admin not found',
                }
            });
        }
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
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) return res.status(404).json({ 
            success: false,
            error: {
                code: 404,
                message: 'Admin not found',
            }
        });
        
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) return res.status(401).json({ 
            success: false,
            error: {
                code: 401,
                message: 'Wrong password',
            }
        });
        
        const token = jwt.sign({ id: admin.admin_id }, process.env.JWT_SECRET);
        res.status(200).json({
            success: true,
            message: 'Login success',
            token,
            user: {
                id: admin.admin_id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
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
}

module.exports = { createAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin, loginAdmin };