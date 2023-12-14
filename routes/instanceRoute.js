const express = require('express');
const router = express.Router();

const {checkAuth, checkAuthRole} = require('./../middleware/checkauth');
const RoleType = require('./../utils/roleType');

const {
    getInstances,
    // getAllInstancesStatus,
    checkStatusByEmail,
    getInstanceById,
    updateInstanceById,
    deleteInstanceById,
} = require('./../controllers/instanceController');

/**
 * @swagger
 * tags:
 *  name: Instances
 *  description: Instance management
 */

/**
 * @swagger
 * /api/v1/instance:
 *   get:
 *     summary: Get instances with optional filters
 *     tags:
 *       - Instances
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by instance type (Gerakan, Komunitas, Yayasan)
 *       - in: query
 *         name: cluster
 *         schema:
 *           type: string
 *         description: Filter by instance cluster
 *       - in: query
 *         name: established_year
 *         schema:
 *           type: integer
 *         description: Filter by establishment year
 *       - in: query
 *         name: area
 *         schema:
 *           type: string
 *         description: Filter by area (Nasional, Lebih dari Satu Provinsi, Hanya Satu Provinsi, Kota/Kabupaten, Kecamatan/Kelurahan/Lingkup Lebih Kecil)
 *       - in: query
 *         name: province
 *         schema:
 *           type: string
 *         description: Filter by province name
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city name
 *       - in: query
 *         name: instances_beneficiaries
 *         schema:
 *           type: integer
 *         description: Filter by the number of beneficiaries
 *       - in: query
 *         name: fund_source
 *         schema:
 *           type: string
 *         description: Filter by fund source name
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by instance status
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by instance email
 *       - in: query
 *         name: covered_area_id
 *         schema:
 *           type: integer
 *         description: Filter by covered area ID
 *       - in: query
 *         name: covered_area_city_name
 *         schema:
 *           type: string
 *         description: Filter by covered area city name
 *       - in: query
 *         name: covered_area_province_name
 *         schema:
 *           type: string
 *         description: Filter by covered area province name
 *       - in: query
 *         name: include
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields to include in the response
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               status: success
 *               message: Instances retrieved successfully
 *               data:
 *                 - instance_id: 1
 *                   batch: Batch1
 *                   type: Gerakan
 *                   name: Example Instance
 *                   email: example@example.com
 *                   sector: Kesehatan
 *                   focus: Eliminasi TBC
 *                   established_month: Januari
 *                   established_year: 2020
 *                   area: Nasional
 *                   instance_covered_area:
 *                     - province: Example Province
 *                       city: Example City
 *                   beneficiaries:
 *                     - Beneficiary 1
 *                     - Beneficiary 2
 *                   total_beneficiaries: 100
 *                   instance_fund_source:
 *                     - Fund Source 1
 *                     - Fund Source 2
 *                   instance_sdg:
 *                     - SDG 1
 *                     - SDG 2
 *                   description: Example description
 *                   address_street: Example Street
 *                   address_village: Example Village
 *                   address_district: Example District
 *                   address_regency: Example Regency
 *                   address_province: Example Province
 *                   address_postal_code: Example Postal Code
 *                   url_company_profile: http://example.com/company_profile
 *                   url_program_proposal: http://example.com/program_proposal
 *                   url_report_program: http://example.com/report_program
 *                   social_instagram: example_instagram
 *                   social_website: http://example.com
 *                   social_tiktok: example_tiktok
 *                   social_youtube: example_youtube
 *                   status: Menunggu
 */
router.get('/api/v1/instance', checkAuth, checkAuthRole(RoleType.ALL), getInstances);

/**
 * @swagger
 * /api/v1/instance/status:
 *   post:
 *     summary: Check instance status by email
 *     tags:
 *       - Instances
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the instance to check status
 *             example:
 *               email: example@example.com
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               status: success
 *               message: Instance found
 *               data:
 *                 name: Example Instance
 *                 status: Menunggu
 *       404:
 *         description: Instance not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: error
 *               message: Instance not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               code: 500
 *               status: error
 *               message: Internal server error. Details...
 */

// Route for checking instance status by email
router.post('/api/v1/instance/status', checkStatusByEmail);

// // Route for creating a new instance
// router.post('/api/v1/instances', checkAuth, checkAuthRole(RoleType.MENTOR), createInstance);

/**
 * @swagger
 * /api/v1/instance/{id}:
 *   get:
 *     summary: Get instance by ID
 *     tags:
 *       - Instances
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Instance ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               status: success
 *               message: Instance retrieved successfully
 *               data:
 *                 instance_id: 1
 *                 type: Gerakan
 *                 name: Example Instance
 *                 email: example@example.com
 *                 sector: Kesehatan
 *                 focus: Eliminasi TBC
 *                 established_month: Januari
 *                 established_year: 2020
 *                 area: Nasional
 *                 instance_covered_area:
 *                   - province: Example Province
 *                     city: Example City
 *                 beneficiaries:
 *                   - Beneficiary 1
 *                   - Beneficiary 2
 *                 total_beneficiaries: 100
 *                 instance_fund_source:
 *                   - Fund Source 1
 *                   - Fund Source 2
 *                 instance_sdg:
 *                   - SDG 1
 *                   - SDG 2
 *                 description: Example description
 *                 address_street: Example Street
 *                 address_village: Example Village
 *                 address_district: Example District
 *                 address_regency: Example Regency
 *                 address_province: Example Province
 *                 address_postal_code: Example Postal Code
 *                 url_company_profile: http://example.com/company_profile
 *                 url_program_proposal: http://example.com/program_proposal
 *                 social_instagram: example_instagram
 *                 social_website: http://example.com
 *                 social_tiktok: example_tiktok
 *                 social_youtube: example_youtube
 *                 status: Menunggu
 *       404:
 *         description: Instance not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: fail
 *               message: Instance not found
 */
// Route for getting instance by ID
router.get('/api/v1/instance/:id', checkAuth, getInstanceById);

/**
 * @swagger
 * /api/v1/instance/{id}:
*   put:
 *     summary: Update instance by ID
 *     tags:
 *       - Instances
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Instance ID
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *            type: object
 *            properties:
 *              type:
 *                type: string
 *                description: Instance type (Gerakan, Komunitas, Yayasan)
 *              name:
 *                type: string
 *                description: Instance name
 *              email:
 *                type: string
 *                description: Instance email
 *              sector:
 *                type: string
 *                description: Instance sector
 *              focus:
 *                type: string
 *                description: Instance focus
 *              established_month:
 *                type: string
 *                description: Instance establishment month
 *              established_year:
 *                type: integer
 *                description: Instance establishment year
 *              area:
 *                type: string
 *                description: Instance area (Nasional, Lebih dari Satu Provinsi, Hanya Satu Provinsi, Kota/Kabupaten, Kecamatan/Kelurahan/Lingkup Lebih Kecil)
 *              total_beneficiaries:
 *                type: integer
 *                description: Total number of beneficiaries
 *              description:
 *                type: string
 *                description: Instance description
 *              address_street:
 *                type: string
 *                description: Instance street address
 *              address_village:
 *                type: string
 *                description: Instance village address
 *              address_district:
 *                type: string
 *                description: Instance district address
 *              address_regency:
 *                type: integer
 *                description: Instance regency address
 *              address_province:
 *                type: integer
 *                description: Instance province address
 *              address_postal_code:
 *                type: string
 *                description: Instance postal code
 *              url_company_profile:
 *                type: string
 *                description: URL to the instance company profile
 *              url_program_proposal:
 *                type: string
 *                description: URL to the instance program proposal
 *              social_instagram:
 *                type: string
 *                description: Instance Instagram account
 *              social_website:
 *                type: string
 *                description: Instance website
 *              social_tiktok:
 *                type: string
 *                description: Instance TikTok account
 *              social_youtube:
 *                type: string
 *                description: Instance YouTube account
 *              status:
 *                type: string
 *                description: Instance status (Menunggu, Ditolak, Wawancara, Lolos)
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               status: success
 *               message: Instance updated successfully
 *               data:
 *                 instance_id: 1
 *                 type: Gerakan
 *                 name: Updated Instance
 *                 email: updated@example.com
 *                 sector: Pendidikan
 *                 focus: Stunting
 *                 established_month: Februari
 *                 established_year: 2021
 *                 area: Kota/Kabupaten
 *                 instance_covered_area:
 *                   - province: Updated Province
 *                     city: Updated City
 *                 beneficiaries:
 *                   - Updated Beneficiary 1
 *                   - Updated Beneficiary 2
 *                 total_beneficiaries: 150
 *                 instance_fund_source:
 *                   - Updated Fund Source 1
 *                   - Updated Fund Source 2
 *                 instance_sdg:
 *                   - Updated SDG 1
 *                   - Updated SDG 2
 *                 description: Updated description
 *                 address_street: Updated Street
 *                 address_village: Updated Village
 *                 address_district: Updated District
 *                 address_regency: Updated Regency
 *                 address_province: Updated Province
 *                 address_postal_code: Updated Postal Code
 *                 url_company_profile: http://updated.com/company_profile
 *                 url_program_proposal: http://updated.com/program_proposal
 *                 social_instagram: updated_instagram
 *                 social_website: http://updated.com
 *                 social_tiktok: updated_tiktok
 *                 social_youtube: updated_youtube
 *                 status: Ditolak
 *       403:
 *         description: Forbidden access
 *         content:
 *           application/json:
 *             example:
 *               code: 403
 *               status: fail
 *               message: Forbidden access
 *       404:
 *         description: Instance or Participants not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: fail
 *               message: Instance or Participants not found
 */
// Route for updating instance by ID
router.put('/api/v1/instance/:id', checkAuth, checkAuthRole([...RoleType.PARTICIPANT, ...RoleType.SUPERADMIN]), updateInstanceById);

/**
 * @swagger
 * /api/v1/instance/{id}:
 *   delete:
 *     summary: Delete instance by ID
 *     tags:
 *       - Instances
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Instance ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               status: success
 *               message: Instance deleted successfully
 *               data:
 *                 instance_id: 1
 *                 name: Example Instance
 *                 email: example@example.com
 *                 participants:
 *                   - Participant 1
 *                   - Participant 2
 *       404:
 *         description: Instance not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               status: fail
 *               message: Instance not found
 *       500:
 *         description: Failed to delete instance
 *         content:
 *           application/json:
 *             example:
 *               code: 500
 *               status: fail
 *               message: Failed to delete instance
 */
// Route for deleting instance by ID
router.delete('/api/v1/instance/:id', checkAuth, checkAuthRole(RoleType.SUPERADMIN), deleteInstanceById);

module.exports = router;
