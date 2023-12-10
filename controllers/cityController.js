const City = require('../models/city');
const Province = require('../models/province');
const { successResponse, errorResponse } = require('../utils/responseBuilder');


// Get all cities
const getAllCities = async (req, res) => {
    try {
        const cities = await City.findAll();
        res.json(successResponse(200, 'Cities found', cities.map((city) => ({
            id: city.id,
            name: city.name,
            province_id: city.province_id,
        }))));
    } catch (error) {
        res.status(500).json(errorResponse(error.code, error.message));
    }
};

// Get a city by ID
const getCityById = async (req, res) => {
    const { id } = req.params;
    try {
        const city = await City.findByPk(id);
        if (city) {
            res.json(successResponse(200, 'City found', {
                id: city.id,
                name: city.name,
                province_id: city.province_id,
            }));
        } else {
            res.status(404).json(errorResponse(404, 'City not found'));
        }
    } catch (error) {
        res.status(500).json(errorResponse(error.code, error.message));
    }
};

// // Create a new city
// const createCity = async (req, res) => {
//     const { name, province_id } = req.body;
//     try {
//         const province = await Province.findByPk(province_id);
//         if (!province) res.status(404).json(errorResponse(404, 'Province not found'));
        
//         const city = await City.create({ name, province_id });
//         res.status(201).json(successResponse(201, 'City created', {
//             id: city.id,
//             name: city.name,
//             province_id: city.province_id,
//         }));
//     } catch (error) {
//         res.status(500).json(errorResponse(error.code, error.message));
//     }
// };

// // Update a city
// const updateCity = async (req, res) => {
//     const { id } = req.params;
//     const { name, province_id } = req.body;
//     try {
//         const city = await City.findByPk(id);
//         if (!city) {
//             res.status(404).json(errorResponse(404, 'City not found'));
//         }

//         city.name = name;
//         city.province_id = province_id;
//         await city.save();

//         res.json(successResponse(200, 'City updated', {
//             id: city.id,
//             name: city.name,
//             province_id: city.province_id,
//         }));
//     } catch (error) {
//         res.status(500).json(errorResponse(error.code, error.message));
//     }
// };

// // Delete a city
// const deleteCity = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const city = await City.findByPk(id);
//         if (city) {
//             await city.destroy();
//             res.json(successResponse(200, 'City deleted'));
//         } else {
//             res.status(404).json(errorResponse(404, 'City not found'));
//         }
//     } catch (error) {
//         res.status(500).json(errorResponse(error.code, error.message));
//     }
// };

module.exports = {
    getAllCities,
    getCityById,
    // createCity,
    // updateCity,
    // deleteCity,
};
