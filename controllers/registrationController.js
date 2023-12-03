// Import models
const Instance = require('../models/instance');
const InstanceCoveredArea = require('../models/instancecoveredarea');
const Participant = require('../models/participant');
const InstanceFundSource = require('../models/instancefundsource');
const InstanceSDG = require('../models/instancesdg');
const Address = require('../models/address');
const SocialMedia = require('../models/socialmedia');
const Beneficiary = require('../models/beneficiary');
const InstanceBeneficiary = require('../models/instancebeneficiary');
const Sdg = require('../models/sustainabledevelopmentgoal');
const db = require('../config/db');
const { errorResponse, successResponse } = require('../utils/responseBuilder');


const register = async (req, res) => {
    try {
        const result = await db.transaction(async (t) => {
            // variable for summary of registration process
            let instance;
            const instance_covered_area = [];
            const instanceBeneficiaries = []; // list of instance_beneficiary
            const instanceFundSources = []; // list of instance_fund_source
            const instanceSdg = []; // list of sdg
            const instanceSocialMedia = []; // list of social media
            let address; // instance address
                        
         // Agency (instance) Profile
            // Get the instance information from the request body
            const {
                    type,
                    name,
                    email,
                    sector,
                    focus,
                    established_month,
                    established_year,
                    area,
                    total_beneficiaries,
                    description,
                    url_company_profile,
                    url_program_proposal
                  } = req.body;

            // Check if instance already exists
            const existingInstance = await Instance.findOne({ where: { name: name, email: email } });
            if (existingInstance) {
                instance = existingInstance;
            } else {
                instance = await Instance.create({
                    type,
                    name,
                    email,
                    sector,
                    focus,
                    established_month,
                    established_year,
                    area,
                    total_beneficiaries,
                    description,
                    url_company_profile,
                    url_program_proposal,
                }, { transaction: t });
            }

         // Create instance covered area
            // Get the instance covered area information from the request body
            const city_id = req.body.city_id;  // list of city_id ()

            for (let i = 0; i < city_id.length; i++) {
                const cityId = city_id[i];
                const existingInstanceCoveredArea = await InstanceCoveredArea.findOne({ where: { city_id: cityId, instance_id: instance.instance_id } });

                if (!existingInstanceCoveredArea) {
                    const newInstanceCoveredArea = await InstanceCoveredArea.create({ city_id: cityId, instance_id: instance.instance_id }, { transaction: t });
                    instance_covered_area.push(newInstanceCoveredArea);
                } else {
                    instance_covered_area.push(existingInstanceCoveredArea);
                }
            }
         
         // ADD Instance Beneficiaries
            // Create Beneficiaries if not exists
            const beneficiaries = req.body.beneficiaries; // list of beneficiary target name
            const targetBeneficiariesId = [];

            for (let i = 0; i < beneficiaries.length; i++) {
                const beneficiaryName = beneficiaries[i];
                const existingBeneficiary = await Beneficiary.findOne({ where: { name: beneficiaryName } });

                if (!existingBeneficiary) {
                    const newBeneficiary = await Beneficiary.create({ name: beneficiaryName }, { transaction: t });
                    targetBeneficiariesId.push(newBeneficiary.id);
                } else {
                    targetBeneficiariesId.push(existingBeneficiary.id);
                }
            }

            // Add beneficiary to instance
            for(let i = 0; i < targetBeneficiariesId.length; i++) {
                const beneficiaryId = targetBeneficiariesId[i];
                const existingInstanceBeneficiary = await InstanceBeneficiary.findOne({ where: { beneficiary_id: beneficiaryId, instance_id: instance.instance_id } });

                if (!existingInstanceBeneficiary) {
                    const newInstanceBeneficiary = await InstanceBeneficiary.create({ beneficiary_id: beneficiaryId, instance_id: instance.instance_id }, { transaction: t });
                    instanceBeneficiaries.push(newInstanceBeneficiary);
                } else {
                    instanceBeneficiaries.push(existingInstanceBeneficiary);
                }
            }

         // ADD Agency/Instance Address
            // Get the address information from the request body
            const { address_province_id,
                    address_city_id,
                    address_district,
                    address_village,
                    address_street,
                    address_postal_code } = req.body;

            // Check if address already exists
            const existingAddress = await Address.findOne({ where: 
            {   instance_id: instance.instance_id,
                address_province_id: address_province_id,
                address_city_id: address_city_id,
                address_district: address_district,
                address_village: address_village,
                address_street: address_street,
                address_postal_code: address_postal_code
            } });

            address = existingAddress;

            if (!existingAddress) {
                const newAddress = await Address.create({
                    instance_id: instance.instance_id,
                    address_province_id: address_province_id,
                    address_city_id: address_city_id,
                    address_district: address_district,
                    address_village: address_village,
                    address_street: address_street,
                    address_postal_code: address_postal_code
                }, { transaction: t });
                address = newAddress;
            }


         // ADD instance fund source
            // Create fund source if it doesn't exist
            const fund_sources = req.body.fund_sources; // list of fund source name
            const targetFundSourcesId = [];

            for (let i = 0; i < fund_sources.length; i++) {
                const fundSourceName = fund_sources[i];
                const existingFundSource = await FundSource.findOne({ where: { name: fundSourceName } });

                if (!existingFundSource) {
                    const newFundSource = await FundSource.create({ name: fundSourceName }, { transaction: t });
                    targetFundSourcesId.push(newFundSource.id);
                } else {
                    targetFundSourcesId.push(existingFundSource.id);
                }
            }

            // Add fund source to instance
            for(let i = 0; i < targetFundSourcesId.length; i++) {
                const fundSourceId = targetFundSourcesId[i];
                const existingInstanceFundSource = await InstanceFundSource.findOne({ where: { fund_source_id: fundSourceId, instance_id: instance.instance_id } });

                if (!existingInstanceFundSource) {
                    const newInstanceFundSource = await InstanceFundSource.create({ fund_source_id: fundSourceId, instance_id: instance.instance_id }, { transaction: t });
                    instanceFundSources.push(newInstanceFundSource);
                } else {
                    instanceFundSources.push(existingInstanceFundSource);
                }
            }

         // ADD SDG to instance
            // Add instance SDG if it doesn't exist
            const sdgsId = req.body.sdgsId; // list of sdg Id

            for (let i = 0; i < sdgsId.length; i++) {
                const sdgId = sdgsId[i];
                const existingInstanceSDG = await InstanceSDG.findOne({ where: { sdg_id: sdgId, instance_id: instance.instance_id } });

                if (!existingInstanceSDG) {
                    const newInstanceSDG = await InstanceSDG.create({ sdg_id: sdgId, instance_id: instance.instance_id }, { transaction: t });
                    instanceSdg.push(newInstanceSDG);
                } else {
                    instanceSdg.push(existingInstanceSDG);
                }
            }

         // 8. ADD Instance Social Media
            // Create social media
            const social_media_list = req.body.social_media; // list of social media

            for(let i = 0; i < social_media_list.length; i++) {
                const social_media = social_media_list[i];
                const { platform, url } = social_media;

                
                const existingSocialMedia = await SocialMedia.findOne({ 
                    where: { platform: platform,
                             url: url,
                             instance_id: instance.instance_id 
                } });

                if (!existingSocialMedia) {
                    const newSocialMedia = await SocialMedia.create({
                        platform,
                        url,
                        instance_id: instance.instance_id
                    }, { transaction: t });
                    instanceSocialMedia.push(newSocialMedia);
                } else {
                    instanceSocialMedia.push(existingSocialMedia);
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

                    participants.push(newParticipant);
                } else {
                    participants.push(existingParticipant);
                }

                // Return success response
                return res.status(200).json(successResponse(200, 'Registration success', {
                    instance_id: instance.instance_id,
                    type: instance.type,
                    name: instance.name,
                    email: instance.email,
                    sector: instance.sector,
                    focus: instance.focus,
                    established_month: instance.established_month,
                    established_year: instance.established_year,
                    area: instance.area,
                    instance_eneficiaries: instanceBeneficiaries,
                    total_beneficiaries: instance.total_beneficiaries,
                    description: instance.description,
                    url_company_profile: instance.url_company_profile,
                    url_program_proposal: instance.url_program_proposal,
                    status: instance.status,
                    instance_covered_area: instance_covered_area,
                    instance_fund_sources: instanceFundSources,
                    instance_sdg: instanceSdg,
                    instance_social_media: instanceSocialMedia,
                    address: address,
                    participants: participants
                }));
            }
        });

    } catch (error) {
        // Return error response
        return res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

  module.exports = { register };