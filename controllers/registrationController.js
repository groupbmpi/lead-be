// Import models
const Instance = require('./../models/instance');
const InstanceCoveredArea = require('./../models/instancecoveredarea');
const Participant = require('./../models/participant');
const InstanceFundSource = require('./../models/instancefundsource');
const InstanceSDG = require('./../models/instancesdg');
const Beneficiary = require('./../models/beneficiary');
const InstanceBeneficiary = require('./../models/instancebeneficiary');
const FundSource = require('./../models/fundsource');
const Sdg = require('./../models/sustainabledevelopmentgoal');
const { Database } = require('./../config/db');
const { errorResponse, successResponse } = require('./../utils/responseBuilder');
const City = require('./../models/city');
const Province = require('./../models/province');
const { Op } = require('sequelize');
const db = Database.getInstance().getSequelizeInstance();
const transporter = require('./../config/mailer');

// 1.1 Calon peserta dapat mendaftarkan diri dengan mengisi pertanyaan yang diajukan tanpa harus signup/signin akun 
const register = async (req, res) => {
    try {
        const { 
            type,
            name,
            email,
            batch,
            sector,
            focus,
            established_month,
            established_year,
            area,
            beneficiaries,
            total_beneficiaries,
            description,
            url_company_profile,
            url_program_proposal,
            status,
            stable_fund_source,
            information_source,
            desain_program_training,
            desain_program_knowledge,
            sustainability_training,
            sustainability_knowledge,
            social_report_training,
            social_report_knowledge,
            url_program_report,
            expectation,
            other_inquiries,
            social_instagram,
            social_website,
            social_tiktok,
            social_youtube,
            address_street,
            address_village,
            address_district,
            // address_city_id,
            // address_province_id,
            address_regency,
            address_province,
            address_postal_code, } = req.body;

        // Validasi
        // if (!name || !email || !type || !sector || !focus || !established_month || !established_year || !area || !total_beneficiaries || !description || !address_street || !address_village || !address_district || !address_regency || !address_province || !url_company_profile || !url_program_proposal || !status || !stable_fund_source || !information_source || !desain_program_training || !desain_program_knowledge || !sustainability_training || !sustainability_knowledge || !social_report_training || !social_report_knowledge || !url_program_report || !expectation || !other_inquiries || !social_instagram || !social_website || !social_tiktok || !social_youtube || !address_postal_code || !batch) {
        //   return res.status(400).json(errorResponse(400, `Data yang diberikan tidak lengkap.`));
        // }

        const result = await db.transaction(async (t) => {
            // variable for summary of registration process
            let instance;
            let instance_covered_area = [];
            let instanceBeneficiaries = []; // list of instance_beneficiary
            let instanceFundSources = []; // list of instance_fund_source
            let instanceSdg = []; // list of sdg

            // const city = await City.findById(address_city_id);
            // const province = await Province.findById(address_province_id);
            // if (!city || !province) return res.status(400).json(errorResponse(400, `City or province with id ${address_city_id} or ${address_province_id} does not exist.`));

            const city = await City.findOne({ where: { name: address_regency }, include: Province });
            if (!city) return res.status(400).json(errorResponse(400, `City with name ${address_regency} does not exist.`));

            const province = await Province.findOne({ where: { name: address_province } });
            if (!province) return res.status(400).json(errorResponse(400, `Province with name ${address_province} does not exist.`));

         // Agency (instance) Profile
            // Get the instance information from the request body
            const newInstanceData = {
                type: type,
                name: name,
                email: email,
                batch: batch,
                sector: sector,
                focus: focus,
                established_month: established_month,
                established_year: established_year,
                area: area,
                beneficiaries: beneficiaries,
                total_beneficiaries: total_beneficiaries,
                description: description,
                url_company_profile: url_company_profile,
                url_program_proposal: url_program_proposal,
                status: status,
                stable_fund_source: stable_fund_source,
                information_source: information_source,
                desain_program_training: desain_program_training,
                desain_program_knowledge: desain_program_knowledge,
                sustainability_training: sustainability_training,
                sustainability_knowledge: sustainability_knowledge,
                social_report_training: social_report_training,
                social_report_knowledge: social_report_knowledge,
                url_program_report: url_program_report,
                expectation: expectation,
                other_inquiries: other_inquiries,
                social_instagram: social_instagram,
                social_website: social_website,
                social_tiktok: social_tiktok,
                social_youtube: social_youtube,
                address_street: address_street,
                address_village: address_village,
                address_district: address_district,
                // address_city_id: address_city_id,
                // address_province_id: address_province_id,
                address_regency: address_regency,
                address_province: address_province,
                address_postal_code: address_postal_code,
            };
                

            // Check if instance already exists
            const existingInstance = await Instance.findOne({ where: { email: req.body.email, batch: req.body.batch } });
            if (existingInstance) instance = existingInstance;
            else instance = await Instance.create(newInstanceData, { transaction: t })

        //  // Create instance covered area
        //     // Get the instance covered area information from the request body
        //     const cities = req.body.covered_area_list;  // list of city name

        //     for (let i = 0; i < cities.length; i++) {
        //         const city = (await City.findOne({ where: { name: cities[i] }, include: Province }));
        //         if(!city) return res.status(400).json(errorResponse(400, `City with name ${cities[i]} does not exist.`));
                
        //         // const city = await City.findOne({ where: { city_id: cityId }, include: Province });
        //         // if (!city) return res.status(400).json(errorResponse(400, `City with city_id ${cityId} does not exist.`));
                

        //         const provinceName = city.Province.name;

        //         const existingInstanceCoveredArea = await InstanceCoveredArea.findOne({ where: { city_id: city.city_id, instance_id: instance.instance_id } });

        //         if (!existingInstanceCoveredArea) {
        //             const newInstanceCoveredArea = await InstanceCoveredArea.create({ city_id: city.city_id, instance_id: instance.instance_id }, { transaction: t });
        //         }

        //         instance_covered_area.push({
        //             city: cities[i],
        //             province: provinceName
        //         });
        //     }

        //     const targetBeneficiariesId = [];

        //     for (let i = 0; i < beneficiaries.length; i++) {
        //         const beneficiaryName = beneficiaries[i];  // list of beneficiary name
        //         const existingBeneficiary = await Beneficiary.findOne({ where: { name: beneficiaryName } });

        //         if (!existingBeneficiary) {
        //             const newBeneficiary = await Beneficiary.create({ name: beneficiaryName }, { transaction: t });
        //             targetBeneficiariesId.push(newBeneficiary.beneficiary_id);
        //         } else {
        //             targetBeneficiariesId.push(existingBeneficiary.beneficiary_id);
        //         }
        //     }

        //     // Add beneficiary to instance
        //     for(let i = 0; i < targetBeneficiariesId.length; i++) {
        //         const beneficiaryId = targetBeneficiariesId[i];
        //         const existingInstanceBeneficiary = await InstanceBeneficiary.findOne({ where: { beneficiary_id: beneficiaryId, instance_id: instance.instance_id } });

        //         if (!existingInstanceBeneficiary) {
        //             const newInstanceBeneficiary = await InstanceBeneficiary.create({ beneficiary_id: beneficiaryId, instance_id: instance.instance_id }, { transaction: t });
        //         }
        //     }


        //  // ADD instance fund source
        //     // Create fund source if it doesn't exist
        //     instanceFundSources = req.body.fund_sources; // list of fund source name
        //     const targetFundSourcesId = [];
            
        //     for (let i = 0; i < instanceFundSources.length; i++) {
        //         const fundSourceName = instanceFundSources[i];
        //         const existingFundSource = await FundSource.findOne({ where: { name: fundSourceName } });

        //         if (!existingFundSource) {
        //             const newFundSource = await FundSource.create({ name: fundSourceName }, { transaction: t });
        //             targetFundSourcesId.push(newFundSource.fund_source_id);
        //         } else {
        //             targetFundSourcesId.push(existingFundSource.fund_source_id);
        //         }
        //     }

        //     // Add fund source to instance
        //     for(let i = 0; i < targetFundSourcesId.length; i++) {
        //         const fundSourceId = targetFundSourcesId[i];
        //         const existingInstanceFundSource = await InstanceFundSource.findOne({ where: { fund_source_id: fundSourceId, instance_id: instance.instance_id } });

        //         if (!existingInstanceFundSource) {
        //             InstanceFundSource.create({ fund_source_id: fundSourceId, instance_id: instance.instance_id }, { transaction: t });
        //         }
        //     }

        //  // ADD SDG to instance
        //     // Add instance SDG if it doesn't exist
        //     const sdgsName = req.body.sdgs; // list of sdg name
        //     instanceSdg = sdgsName;

        //     for (let i = 0; i < sdgsName.length; i++) {
        //         const sdg = await Sdg.findOne({ where: { name: sdgsName[i] } });
        //         if (!sdg) return res.status(400).json(errorResponse(400, `SDG with name ${sdgsName[i]} does not exist.`));
        //         const existingInstanceSDG = await InstanceSDG.findOne({ where: { sdg_id: sdg.sdg_id, instance_id: instance.instance_id } });

        //         if (!existingInstanceSDG) {
        //             const newInstanceSDG = await InstanceSDG.create({ sdg_id: sdg.sdg_id, instance_id: instance.instance_id }, { transaction: t });
        //         }
        //     }

        // 5. ADD participants
            // Create participants
            let participants = [];
            participants = req.body.participants; // list of participant


            for (let i = 0; i < participants.length; i++) {
                const participant = participants[i];
                const existingParticipant = await Participant.findOne({ where: { name: participant.name, email: participant.email } });

                if (!existingParticipant) {
                    const newParticipant = await Participant.create({
                        instance_id: instance.instance_id,
                        participant_number: i+1,
                        name: participant.name,
                        position: participant.position,
                        latest_education: participant.latest_education,
                        education_background: participant.education_background,
                        focus: participant.focus,
                        whatsapp_number: participant.whatsapp_number,
                        email: participant.email,
                        joining_reason: participant.joining_reason,
                        url_id_card: participant.url_id_card,
                        url_cv: participant.url_cv,
                        confirmation_1: participant.confirmation_1,
                        confirmation_2: participant.confirmation_2,
                        confirmation_3: participant.confirmation_3,
                        role: 'PARTICIPANT'
                    }, { transaction: t });
                }
            }

            // Return success response
            return res.status(200).json(successResponse(200, 'Your registration has been submitted successfully.', {
                instance_id: instance.instance_id,
                type: instance.type,
                name: instance.name,
                email: instance.email,
                batch: instance.batch,
                sector: instance.sector,
                focus: instance.focus,
                established_month: instance.established_month,
                established_year: instance.established_year,
                area: instance.area,
                total_beneficiaries: instance.total_beneficiaries,
                description: instance.description,
                url_company_profile: instance.url_company_profile,
                url_program_proposal: instance.url_program_proposal,
                status: instance.status,
                stable_fund_source: instance.stable_fund_source,
                information_source: instance.information_source,
                desain_program_training: instance.desain_program_training,
                desain_program_knowledge: instance.desain_program_knowledge,
                sustainability_training: instance.sustainability_training,
                sustainability_knowledge: instance.sustainability_knowledge,
                social_report_training: instance.social_report_training,
                social_report_knowledge: instance.social_report_knowledge,
                url_program_report: instance.url_program_report,
                expectation: instance.expectation,
                other_inquiries: instance.other_inquiries,
                social_instagram: instance.social_instagram,
                social_website: instance.social_website,
                social_tiktok: instance.social_tiktok,
                social_youtube: instance.social_youtube,
                address_street: instance.address_street,
                address_village: instance.address_village,
                address_district: instance.address_district,
                // address_city_id: instance.address_city_id,
                // address_province_id: instance.address_province_id,
                address_regency: instance.address_regency,
                address_province: instance.address_province,
                address_postal_code: instance.address_postal_code,
                instance_covered_area: instance.instance_covered_area,
                instance_beneficiaries: instance.instanceBeneficiaries,
                instance_fund_sources: instance.instanceFundSources,
                instance_sdg: instance.instanceSdg,
                instance_participants: participants.map((participant) => ({
                    participant_number: participant.participant_number,
                    name: participant.name,
                    position: participant.position,
                    latest_education: participant.latest_education,
                    education_background: participant.education_background,
                    focus: participant.focus,
                    whatsapp_number: participant.whatsapp_number,
                    email: participant.email,
                    joining_reason: participant.joining_reason,
                    url_id_card: participant.url_id_card,
                    url_cv: participant.url_cv,
                    confirmation_1: participant.confirmation_1,
                    confirmation_2: participant.confirmation_2,
                    confirmation_3: participant.confirmation_3,
                })),
            }));
        });

    } catch (error) {
        // Return error response
        return res.status(500).json(errorResponse(500, `Internal server error. \nDetail: ${error.message}. ${error.stack}`));
    }
};

const sendRegistrationConfirmation = (req, res) => {
    // Get the participant's email from the request body
    const { email } = req.body;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Registration Confirmation',
      html: `
        <style>
          body { font-family: sans-serif; }
          h1 { font-size: 20px; font-weight: bold; margin-top: 0; }
          p { margin-bottom: 10px; }
          .container { width: 500px; margin: 0 auto; }
          .footer { text-align: left; }
        </style>
      
        <body>
          <div class="container">
            <h1>Pendaftaran Berhasil</h1>
            <p>Terima kasih telah mendaftar.</p>
            <p>Jawaban Anda telah kami terima. Kami akan segera menghubungi Anda untuk proses selanjutnya.</p>
            <p class="footer">Salam,</p>
            <p class="footer">Bakrie Center Foundation</p>
          </div>
        </body>`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json(errorResponse(500, `Failed to send email notification. ${error.message}`));
      } else {
        console.log('Email sent:', info.response);
        return res.json(successResponse(200, 'Email notification sent successfully'));
      }
    });
  };

  module.exports = { register, sendRegistrationConfirmation };