// Import models
const Instance = require('../models/instance');
const InstanceCoveredArea = require('../models/instancecoveredarea');
const Participant = require('../models/participant');
const InstanceFundSource = require('../models/instancefundsource');
const InstanceSDG = require('../models/instancesdg');
const Beneficiary = require('../models/beneficiary');
const InstanceBeneficiary = require('../models/instancebeneficiary');
const FundSource = require('../models/fundsource');
const Sdg = require('../models/sustainabledevelopmentgoal');
const { Database } = require('../config/db');
const { errorResponse, successResponse } = require('../utils/responseBuilder');
const City = require('../models/city');
const Province = require('../models/province');
const { Op } = require('sequelize');
const db = Database.getInstance().getSequelizeInstance();

// 1.1 Calon peserta dapat mendaftarkan diri dengan mengisi pertanyaan yang diajukan tanpa harus signup/signin akun 
const register = async (req, res) => {
    try {
        const result = await db.transaction(async (t) => {
            // variable for summary of registration process
            let instance;
            let instance_covered_area = [];
            let instanceBeneficiaries = []; // list of instance_beneficiary
            let instanceFundSources = []; // list of instance_fund_source
            let instanceSdg = []; // list of sdg
                        
         // Agency (instance) Profile
            // Get the instance information from the request body
            const address_province = (await Province.findOne({ where: { name: req.body.address_province } })).province_id;
            const address_regency = (await City.findOne({ where: { name: req.body.address_regency } })).city_id;

            console.log(`address_province: ${address_province}\naddress_regency: ${address_regency}`);

            const newInstanceData = {
                type: req.body.type,
                name: req.body.name,
                email: req.body.email,
                sector: req.body.sector,
                focus: req.body.focus,
                established_month: req.body.established_month,
                established_year: req.body.established_year,
                area: req.body.area,
                total_beneficiaries: req.body.total_beneficiaries,
                description: req.body.description,
                address_street: req.body.address_street,
                address_village: req.body.address_village,
                address_district: req.body.address_district,
                address_regency: address_regency,
                address_province: address_province,
                address_postal_code: req.body.address_postal_code,
                url_company_profile: req.body.url_company_profile,
                url_program_proposal: req.body.url_program_proposal,
                social_instagram: req.body.social_instagram,
                social_website: req.body.social_website,
                social_tiktok: req.body.social_tiktok,
                social_youtube: req.body.social_youtube,
              };

            // Check if instance already exists
            const existingInstance = await Instance.findOne({ where: { [Op.or]: [{ name: newInstanceData.name }, { email: newInstanceData.email }] } });
            if (existingInstance)
                instance = existingInstance;
            else
                instance = await Instance.create(newInstanceData, { transaction: t })

         // Create instance covered area
            // Get the instance covered area information from the request body
            const cities = req.body.covered_area_list;  // list of city name ()

            for (let i = 0; i < cities.length; i++) {
                const cityId = (await City.findOne({ where: { name: cities[i] } })).city_id;
                const city = await City.findOne({ where: { city_id: cityId }, include: Province });

                if (!city) {
                    throw new Error(`City with city_id ${cityId} does not exist.`);
                }

                const provinceName = city.Province.name;

                const existingInstanceCoveredArea = await InstanceCoveredArea.findOne({ where: { city_id: cityId, instance_id: instance.instance_id } });

                if (!existingInstanceCoveredArea) {
                    const newInstanceCoveredArea = await InstanceCoveredArea.create({ city_id: cityId, instance_id: instance.instance_id }, { transaction: t });
                }

                instance_covered_area.push({
                    city: cities[i],
                    province: provinceName
                });
            }

            const targetBeneficiariesId = [];

            for (let i = 0; i < instanceBeneficiaries.length; i++) {
                const beneficiaryName = beneficiaries[i];
                const existingBeneficiary = await Beneficiary.findOne({ where: { name: beneficiaryName } });

                if (!existingBeneficiary) {
                    const newBeneficiary = await Beneficiary.create({ name: beneficiaryName }, { transaction: t });
                    targetBeneficiariesId.push(newBeneficiary.beneficiary_id);
                } else {
                    targetBeneficiariesId.push(existingBeneficiary.beneficiary_id);
                }
            }

            // Add beneficiary to instance
            for(let i = 0; i < targetBeneficiariesId.length; i++) {
                const beneficiaryId = targetBeneficiariesId[i];
                const existingInstanceBeneficiary = await InstanceBeneficiary.findOne({ where: { beneficiary_id: beneficiaryId, instance_id: instance.instance_id } });

                if (!existingInstanceBeneficiary) {
                    const newInstanceBeneficiary = await InstanceBeneficiary.create({ beneficiary_id: beneficiaryId, instance_id: instance.instance_id }, { transaction: t });
                }
            }


         // ADD instance fund source
            // Create fund source if it doesn't exist
            instanceFundSources = req.body.fund_sources; // list of fund source name
            const targetFundSourcesId = [];
            
            for (let i = 0; i < instanceFundSources.length; i++) {
                const fundSourceName = instanceFundSources[i];
                const existingFundSource = await FundSource.findOne({ where: { name: fundSourceName } });

                if (!existingFundSource) {
                    const newFundSource = await FundSource.create({ name: fundSourceName }, { transaction: t });
                    targetFundSourcesId.push(newFundSource.fund_source_id);
                } else {
                    targetFundSourcesId.push(existingFundSource.fund_source_id);
                }
            }

            // Add fund source to instance
            for(let i = 0; i < targetFundSourcesId.length; i++) {
                const fundSourceId = targetFundSourcesId[i];
                const existingInstanceFundSource = await InstanceFundSource.findOne({ where: { fund_source_id: fundSourceId, instance_id: instance.instance_id } });

                if (!existingInstanceFundSource) {
                    InstanceFundSource.create({ fund_source_id: fundSourceId, instance_id: instance.instance_id }, { transaction: t });
                }
            }

         // ADD SDG to instance
            // Add instance SDG if it doesn't exist
            const sdgsName = req.body.sdgs; // list of sdg name
            instanceSdg = sdgsName;

            for (let i = 0; i < sdgsName.length; i++) {
                const sdg = await Sdg.findOne({ where: { name: sdgsName[i] } });
                console.log(`sdg: ${sdg}`);
                const existingInstanceSDG = await InstanceSDG.findOne({ where: { sdg_id: sdg.sdg_id, instance_id: instance.instance_id } });

                if (!existingInstanceSDG) {
                    const newInstanceSDG = await InstanceSDG.create({ sdg_id: sdg.sdg_id, instance_id: instance.instance_id }, { transaction: t });
                }
            }

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
            return res.status(200).json(successResponse(200, `Hasil copy pendaftaran anda telah dikirim ke ${instance.email} 
            Status pendaftaran dapat dilihat di Home > Seleksi.`, {
                instance_id: instance.instance_id,
                name: instance.name,
                email: instance.email,
                sector: instance.sector,
                focus: instance.focus,
                established_month: instance.established_month,
                established_year: instance.established_year,
                area: instance.area,
                total_beneficiaries: instance.total_beneficiaries,
                description: instance.description,
                address_street: instance.address_street,
                address_village: instance.address_village,
                address_district: instance.address_district,
                address_regency: instance.address_regency,
                address_province: instance.address_province,
                address_postal_code: instance.address_postal_code,
                url_company_profile: instance.url_company_profile,
                url_program_proposal: instance.url_program_proposal,
                social_instagram: instance.social_instagram,
                social_website: instance.social_website,
                social_tiktok: instance.social_tiktok,
                social_youtube: instance.social_youtube,
                instance_covered_area: instance_covered_area,
                instance_beneficiaries: instanceBeneficiaries,
                instance_fund_sources: instanceFundSources,
                instance_sdg: instanceSdg,
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

  module.exports = { register };