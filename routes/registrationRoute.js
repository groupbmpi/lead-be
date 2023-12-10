const express = require('express');
const router = express.Router();
const { checkAuth, checkAuthRole } = require('../middleware/checkauth');
const { register, sendRegistrationConfirmation } = require('../controllers/registrationController');

const RoleType = require('../utils/roleType');

/**
 * @swagger
 * tags:
 *  name: Registration
 *  description: Registration management
 */ 

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               sector:
 *                 type: string
 *               focus:
 *                 type: string
 *               established_month:
 *                 type: string
 *               established_year:
 *                 type: string
 *               area:
 *                 type: string
 *               total_beneficiaries:
 *                 type: string
 *               description:
 *                 type: string
 *               address_street:
 *                 type: string
 *               address_village:
 *                 type: string
 *               address_district:
 *                 type: string
 *               address_regency:
 *                 type: string
 *               address_province:
 *                 type: string
 *               address_postal_code:
 *                 type: string
 *               url_company_profile:
 *                 type: string
 *               url_program_proposal:
 *                 type: string
 *               social_instagram:
 *                 type: string
 *               social_website:
 *                 type: string
 *               social_tiktok:
 *                 type: string
 *               social_youtube:
 *                 type: string
 *               covered_area_list:
 *                 type: array
 *                 items:
 *                   type: string
 *               fund_sources:
 *                 type: array
 *                 items:
 *                   type: string
 *               sdgs:
 *                 type: array
 *                 items:
 *                   type: string
 *               participants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     position:
 *                       type: string
 *                     latest_education:
 *                       type: string
 *                     education_background:
 *                       type: string
 *                     focus:
 *                       type: string
 *                     whatsapp_number:
 *                       type: string
 *                     email:
 *                       type: string
 *                     joining_reason:
 *                       type: string
 *                     url_id_card:
 *                       type: string
 *                     url_cv:
 *                       type: string
 *                     confirmation_1:
 *                       type: string
 *                     confirmation_2:
 *                       type: string
 *                     confirmation_3:
 *                       type: string
 *     responses:
 *       '200':
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Hasil copy pendaftaran anda telah dikirim ke email@example.com. Status pendaftaran dapat dilihat di Home > Seleksi.
 *                 data:
 *                   type: object
 *                   properties:
 *                     instance_id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     sector:
 *                       type: string
 *                     focus:
 *                       type: string
 *                     established_month:
 *                       type: string
 *                     established_year:
 *                       type: string
 *                     area:
 *                       type: string
 *                     total_beneficiaries:
 *                       type: string
 *                     description:
 *                       type: string
 *                     address_street:
 *                       type: string
 *                     address_village:
 *                       type: string
 *                     address_district:
 *                       type: string
 *                     address_regency:
 *                       type: string
 *                     address_province:
 *                       type: string
 *                     address_postal_code:
 *                       type: string
 *                     url_company_profile:
 *                       type: string
 *                     url_program_proposal:
 *                       type: string
 *                     social_instagram:
 *                       type: string
 *                     social_website:
 *                       type: string
 *                     social_tiktok:
 *                       type: string
 *                     social_youtube:
 *                       type: string
 *                     instance_covered_area:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           city:
 *                             type: string
 *                           province:
 *                             type: string
 *                     instance_beneficiaries:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           beneficiary_id:
 *                             type: integer
 *                           instance_id:
 *                             type: integer
 *                     instance_fund_sources:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           instance_id:
 *                             type: integer
 *                           fund_source_id:
 *                             type: integer
 *                     instance_sdg:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           instance_id:
 *                             type: integer
 *                           sdg_id:
 *                             type: integer
 *                     instance_participants:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           participant_number:
 *                             type: string
 *                           name:
 *                             type: string
 *                           position:
 *                             type: string
 *                           latest_education:
 *                             type: string
 *                           education_background:
 *                             type: string
 *                           focus:
 *                             type: string
 *                           whatsapp_number:
 *                             type: string
 *                           email:
 *                             type: string
 *                           joining_reason:
 *                             type: string
 *                           url_id_card:
 *                             type: string
 *                           url_cv:
 *                             type: string
 *                           confirmation_1:
 *                             type: string
 *                           confirmation_2:
 *                             type: string
 *                           confirmation_3:
 *                             type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
router.post('/api/v1/register', register);

/**
 * @swagger
 * /api/v1/register/send:
 *   post:
 *     summary: Send registration confirmation email
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                   description: The HTTP status code indicating success.
 *                 status:
 *                   type: string
 *                   example: success
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   example: Email notification sent successfully
 *                   description: A brief message describing the result.
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                   description: The HTTP status code indicating an internal server error.
 *                 status:
 *                   type: string
 *                   example: error
 *                   description: The status of the response indicating an error.
 *                 message:
 *                   type: string
 *                   example: Failed to send email notification. [error message]
 *                   description: A brief message describing the error.
 */
router.post('/api/v1/register/send', sendRegistrationConfirmation);


module.exports = router;