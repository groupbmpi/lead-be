const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { successResponse, errorResponse } = require('../utils/responseBuilder');

const Instance = require('../models/instance');
const City = require('../models/city');

const InstanceCoveredArea = require("../models/instancecoveredarea");


// Create a new instance covered area
const createInstanceCoveredArea = async (req, res) => {
    try {
        // Get the instance and city IDs from the request body
        const { instance_id, city_id } = req.body;

        // check if instance_id and city_id already exist
        const instanceCoveredArea = await InstanceCoveredArea.findOne({
            where: {
                instance_id,
                city_id
            }
        });

        if (instanceCoveredArea) {
            return res.status(400).json(errorResponse(400, 'Instance covered area already exists'));
        }

        // Create the instance covered area
        const newInstanceCoveredArea = await InstanceCoveredArea.create({
            instance_id,
            city_id
        });

        // Return success response
        return res.status(201).json(successResponse(201, 'Instance covered area created successfully', newInstanceCoveredArea));
    } catch (error) {
        // Return error response
        return res.status(500).json(errorResponse(500, 'Failed to create instance covered area', error));
    }
};

// Get all instance covered areas
const getAllInstanceCoveredAreas = async (req, res) => {
    try {
        // Get all instance covered areas
        const instanceCoveredAreas = await InstanceCoveredArea.findAll({
            include: [
                {
                    model: Instance,
                    as: 'instance',
                    attributes: ['email', 'name', 'description', 'type', 'sector', 'focus', 'established_month', 'established_year', 'area', 'total_beneficiaries', 'url_company_profile', 'url_program_proposal', 'status']
                },
                {
                    model: City,
                    as: 'city',
                    attributes: ['name', 'province_id']
                }
            ]
        });

        // Return success response
        return successResponse(res, 'Instance covered areas retrieved successfully', instanceCoveredAreas);
    } catch (error) {
        // Return error response
        return errorResponse(res, 'Failed to retrieve instance covered areas', error);
    }
};

// Get instance covered area by Instance ID
const getInstanceCoveredAreaByInstanceId = async (req, res) => {
    try {
         // Get the instance covered area ID from the request parameters
         const { instance_id } = req.body;

         // Find the instance covered area by ID
         const instanceCoveredArea = await InstanceCoveredArea.findAll({
         where: {
            instance_id
         },
         include: [
             {
                 model: Instance,
                 as: 'instance',
                 attributes: ['email', 'name', 'description', 'type', 'sector', 'focus', 'established_month', 'established_year', 'area', 'total_beneficiaries', 'url_company_profile', 'url_program_proposal', 'status'],
             },
             {
                model: City,
                as: 'city',
                attributes: ['name', 'province_id']
             }
         ]
         });

         // Return success response
         return res.status(200).json(successResponse(200, 'Instance covered area retrieved successfully', instanceCoveredArea));
    } catch (error) {
        // Return error response
        return res.status(500).json(errorResponse(500, 'Failed to retrieve instance covered area', error));
    }
};


// get instance covered area by city id
const getInstanceCoveredAreaByCityId = async (req, res) => {
    try {
         // Get the instance covered area ID from the request parameters
         const { city_id } = req.params;

         // Find the instance covered area by ID
         const instanceCoveredArea = await InstanceCoveredArea.findAll({
         where: {
            city_id
         },
         include: [
             {
                 model: Instance,
                 as: 'instance',
                 
             },
             {
                model: City,
                as: 'city',
                attributes: ['name', 'province_id']
             }
         ]
         });

         // Return success response
         return res.status(200).json(successResponse(200, 'Instance covered area retrieved successfully', instanceCoveredArea));
    } catch (error) {
        // Return error response
        return res.status(500).json(errorResponse(500, 'Failed to retrieve instance covered area', error));
    }
};


// Update instance covered area by ID
const updateInstanceCoveredAreaById = async (req, res) => {
    try {
        // Get the instance covered area ID from the request parameters
        const { id } = req.params;

        // Get the updated instance and city IDs from the request body
        const { instance_id, city_id } = req.body;

        // Find the instance covered area by ID
        const instanceCoveredArea = await InstanceCoveredArea.findByPk(id);

        // Update the instance and city IDs
        instanceCoveredArea.instance_id = instance_id;
        instanceCoveredArea.city_id = city_id;

        // Save the updated instance covered area
        await instanceCoveredArea.save();

        // Return success response
        return res.status(200).json(successResponse(200, 'Instance covered area updated successfully', instanceCoveredArea));
    } catch (error) {
        // Return error response
        return res.status(500).json(errorResponse(500, 'Failed to update instance covered area', error));
    }
};

// Delete instance covered area by ID
const deleteInstanceCoveredAreaById = async (req, res) => {
    try {
        // Get the instance covered area ID from the request parameters
        const { id } = req.params;

        // Find the instance covered area by ID
        const instanceCoveredArea = await InstanceCoveredArea.findByPk(id);

        // Delete the instance covered area
        await instanceCoveredArea.destroy();

        // Return success response
        return successResponse(res, 'Instance covered area deleted successfully');
    } catch (error) {
        // Return error response
        return errorResponse(res, 'Failed to delete instance covered area', error);
    }
};

export {
    createInstanceCoveredArea,
    getAllInstanceCoveredAreas,
    getInstanceCoveredAreaByInstanceId,
    getInstanceCoveredAreaByCityId,
    updateInstanceCoveredAreaById,
    deleteInstanceCoveredAreaById
};
