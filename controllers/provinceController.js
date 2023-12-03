const Province = require('../models/province');
const { successResponse, errorResponse } = require('../responseBuilder');

// Get all provinces
const getAllProvinces = async (req, res) => {
    try {
        const provinces = await Province.findAll();
        res.json(successResponse(200, 'Success', provinces));
    } catch (error) {
        res.status(500).json(errorResponse(500, 'Internal server error'));
    }
};

// Get a province by ID
const getProvinceById = async (req, res) => {
    const { id } = req.params;
    try {
        const province = await Province.findByPk(id);
        if (province) {
            res.json(successResponse(200, 'Success', province));
        } else {
            res.status(404).json(errorResponse(404, 'Province not found'));
        }
    } catch (error) {
        res.status(500).json(errorResponse(500, 'Internal server error'));
    }
};

// // Create a new province
// const createProvince = async (req, res) => {
//     const { name } = req.body;
//     try {
//         const province = await Province.create({ name });
//         res.status(201).json(successResponse(201, 'New province successfully created', province));
//     } catch (error) {
//         res.status(500).json(errorResponse(500, 'Internal server error'));
//     }
// };

// // Update a province by ID
// const updateProvinceById = async (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
//     try {
//         const province = await Province.findByPk(id);
//         if (province) {
//             province.name = name;
//             await province.save();
//             res.json(successResponse(200, 'Province successfully updated', province));
//         } else {
//             res.status(404).json(errorResponse(404, 'Province not found'));
//         }
//     } catch (error) {
//         res.status(500).json(errorResponse(500, 'Internal server error'));
//     }
// };

// // Delete a province by ID
// const deleteProvinceById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const province = await Province.findByPk(id);
//         if (province) {
//             await province.destroy();
//             res.json(successResponse(200, 'Success', { message: 'Province deleted successfully' }));
//         } else {
//             res.status(404).json(errorResponse(404, 'Province not found'));
//         }
//     } catch (error) {
//         res.status(500).json(errorResponse(500, 'Internal server error'));
//     }
// };

module.exports = {
    getAllProvinces,
    getProvinceById,
    // createProvince,
    // updateProvinceById,
    // deleteProvinceById
};
