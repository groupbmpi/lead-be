
// Import model
const Instance = require('./../models/instance');
const Participant = require('./../models/participant');
const City = require('./../models/city');
const Province = require('./../models/province');
const InstanceBeneficiary = require('./../models/instancebeneficiary');
const Beneficiary = require('./../models/beneficiary');
const InstanceCoveredArea = require('./../models/instancecoveredarea');
const FundSource = require('./../models/fundsource');

const { errorResponse, successResponse } = require('./../utils/responseBuilder');
const InstanceFundSource = require('./../models/instancefundsource');

const getDashboardSummary = async (req, res) => {
  try {
    // Extract include and status parameters
    const includeParams = req.query.include ? req.query.include.split(',') : ["all"];
    const statusParam = req.query.status ? req.query.status : 'all';
    const totalOnlyParam = req.query.total_only ? req.query.total_only : false;

    let summary = {};
    if (includeParams.includes('batch') || includeParams.includes('all')) summary.batch = {}; //
    if (includeParams.includes('type') || includeParams.includes('all')) summary.type = {};
    if (includeParams.includes('sector') || includeParams.includes('all')) summary.sector = {};
    if (includeParams.includes('focus') || includeParams.includes('all')) summary.focus = {}; //
    if (includeParams.includes('established_year') || includeParams.includes('all')) summary.established_year = {};
    if (includeParams.includes('area') || includeParams.includes('all')) summary.area = {};
    if (!totalOnlyParam && (includeParams.includes('description') || includeParams.includes('all'))) summary.description = {}; //
    if (!totalOnlyParam && (includeParams.includes('url_company_profile') || includeParams.includes('all'))) summary.url_company_profile = {}; //
    if (!totalOnlyParam && (includeParams.includes('url_program_proposal') || includeParams.includes('all'))) summary.url_program_proposal = {}; //
    if (includeParams.includes('stable_fund_source') || includeParams.includes('all')) summary.stable_fund_source = {}; //
    if (includeParams.includes('information_source') || includeParams.includes('all')) summary.information_source = {}; //
    if (includeParams.includes('desain_program_training') || includeParams.includes('all')) summary.desain_program_training = {}; //
    if (!totalOnlyParam && (includeParams.includes('desain_program_knowledge') || includeParams.includes('all'))) summary.desain_program_knowledge = {}; //
    if (includeParams.includes('sustainability_training') || includeParams.includes('all')) summary.sustainability_training = {}; //
    if (!totalOnlyParam && (includeParams.includes('sustainability_knowledge') || includeParams.includes('all'))) summary.sustainability_knowledge = {}; //
    if (includeParams.includes('social_report_training') || includeParams.includes('all')) summary.social_report_training = {}; //
    if (!totalOnlyParam && (includeParams.includes('social_report_knowledge') || includeParams.includes('all'))) summary.social_report_knowledge = {}; //
    if (!totalOnlyParam && (includeParams.includes('url_program_report') || includeParams.includes('all'))) summary.url_program_report = {}; //
    if (!totalOnlyParam && (includeParams.includes('expectation') || includeParams.includes('all'))) summary.expectation = {}; //
    if (!totalOnlyParam && (includeParams.includes('other_inquiries') || includeParams.includes('all'))) summary.other_inquiries = {}; //
    if (!totalOnlyParam && (includeParams.includes('social_instagram') || includeParams.includes('all'))) summary.social_instagram = {}; //
    if (!totalOnlyParam && (includeParams.includes('social_website') || includeParams.includes('all'))) summary.social_website = {}; //
    if (!totalOnlyParam && (includeParams.includes('social_tiktok') || includeParams.includes('all'))) summary.social_tiktok = {}; //
    if (!totalOnlyParam && (includeParams.includes('social_youtube') || includeParams.includes('all'))) summary.social_youtube = {}; //
    // if (!totalOnlyParam && (includeParams.includes('address_data') || includeParams.includes('all'))) summary.address_data = {}; //
    if (includeParams.includes('address_regency') || includeParams.includes('all')) summary.address_regency = {}; //
    if (includeParams.includes('address_province') || includeParams.includes('all')) summary.address_province = {}; //
    if (includeParams.includes('covered_areas') || includeParams.includes('all')) summary.covered_areas = {};
    if (includeParams.includes('beneficiaries') || includeParams.includes('all')) summary.beneficiaries = {};
    if (includeParams.includes('total_beneficiaries') || includeParams.includes('all'))
      summary.total_beneficiaries = { total: 0, instances_total_beneficiaries: {} };
    if (includeParams.includes('fund_source') || includeParams.includes('all')) summary.fund_source = {};
    if (includeParams.includes('participant_data') || includeParams.includes('all'))
      summary.participant_data = {
        total: 0,
        position: {},
        latest_education: {},
        confirmation_1: {},
        confirmation_2: {},
        confirmation_3: {},
      };

    // Get all instances
    // Get instances based on include and status filters
    const instances = await Instance.findAll({
      include: includeParams.flatMap((param) => {
        if (param === 'beneficiaries') {
          return {
            model: InstanceBeneficiary,
            include: [
              {
                model: Beneficiary,
                attributes: ['name'],
              },
            ],
          };
        } else if (param === 'covered_areas') {
            return {
              model: InstanceCoveredArea,
              tableName: 'instance_cover_areas',
              include: [
                {
                  model: City,
                  exclude: ['city_id', 'instance_id'], // Exclude the 'city' property from the output
                  attributes: ['name'],
                  include: [
                    {
                      model: Province,
                      attributes: ['name'],
                    },
                  ],
                  flatten: true,
                },
            ],
          };
        }
         else if (param === 'fund_source') {
                  return {
                    model: InstanceFundSource,
                    include: [
                      {
                        model: FundSource,
                        get: ['name'],
                      },
                    ],
                  };
        } else if (param === 'participant_data') {
            return {
              model: Participant,
              attributes: [
                'name',
                'position',
                'latest_education',
                'confirmation_1',
                'confirmation_2',
                'confirmation_3',
            ],
          };
        } else if (param === 'all') {
          return [
            {
              model: InstanceBeneficiary,
              include: [
                {
                  model: Beneficiary,
                  attributes: ['name'],
                },
              ],
            },
            {
              model: InstanceCoveredArea,
              tableName: 'instance_cover_areas',
              include: [
                {
                  model: City,
                  exclude: ['city_id', 'instance_id'], // Exclude the 'city' property from the output
                  attributes: ['name'],
                  include: [
                    {
                      model: Province,
                      attributes: ['name'],
                    },
                  ],
                  flatten: true,
                },
              ],
            },
            {
              model: InstanceFundSource,
              include: [
                {
                  model: FundSource,
                  attributes: ['name'],
                },
              ],
            },
            {
              model: Participant,
              attributes: [
                'name',
                'position',
                'latest_education',
                'confirmation_1',
                'confirmation_2',
                'confirmation_3',
              ],
            },
          ];
        } else
          return null; // Invalid include parameter
      }).filter(Boolean), // Remove null values from the array
      where: statusParam === 'all' ? {} : { status: statusParam },
    });

    // menghitung total data dari setiap nilai atribut
    instances.forEach((instance) => {
      // type
      if (summary.hasOwnProperty('type')) {
        if (!summary.type[instance.type]) {
          summary.type[instance.type] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
        }
        summary.type[instance.type].total += 1;
        if(!totalOnlyParam && !summary.type[instance.type].instances.includes(instance.name)) 
          summary.type[instance.type].instances.push(instance.name);
      }

      // batch
      if (summary.hasOwnProperty('batch')) {
        if (!summary.batch[instance.batch]) {
          summary.batch[instance.batch] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
        }
        summary.batch[instance.batch].total += 1;
        if(!totalOnlyParam && !summary.batch[instance.batch].instances.includes(instance.name)) 
          summary.batch[instance.batch].instances.push(instance.name);
      }

      // sector
      if (summary.hasOwnProperty('sector')) {
        if (!summary.sector[instance.sector]) {
          summary.sector[instance.sector] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
        }
        summary.sector[instance.sector].total += 1;
        if(!totalOnlyParam && !summary.sector[instance.sector].instances.includes(instance.name)) 
          summary.sector[instance.sector].instances.push(instance.name);
      }

      // focus
      if (summary.hasOwnProperty('focus')) {
        if (!summary.focus[instance.focus]) {
          summary.focus[instance.focus] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
        }
        summary.focus[instance.focus].total += 1;
        if(!totalOnlyParam && !summary.focus[instance.focus].instances.includes(instance.name)) 
          summary.focus[instance.focus].instances.push(instance.name);
      }

      // description
      if (summary.hasOwnProperty('description')) {
        if (!summary.description[instance.name]) {
          summary.description[instance.name] = instance.description;
        }
      }

      // url_company_profile
      if (summary.hasOwnProperty('url_company_profile')) {
        if (!summary.url_company_profile[instance.name]) {
          summary.url_company_profile[instance.name] = instance.url_company_profile;
        }
      }

      // url_program_proposal
      if (summary.hasOwnProperty('url_program_proposal')) {
        if (!summary.url_program_proposal[instance.name]) {
          summary.url_program_proposal[instance.name] = instance.url_program_proposal;
        }
      }

      // stable_fund_source
      if (summary.hasOwnProperty('stable_fund_source')) {
        if (!summary.stable_fund_source[instance.stable_fund_source]) {
          summary.stable_fund_source[instance.stable_fund_source] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
        }
        summary.stable_fund_source[instance.stable_fund_source].total += 1;
        if(!totalOnlyParam && !summary.stable_fund_source[instance.stable_fund_source].instances.includes(instance.name)) 
          summary.stable_fund_source[instance.stable_fund_source].instances.push(instance.name);
      }

      // information_source
      if (summary.hasOwnProperty('information_source')) {
        if (!summary.information_source[instance.information_source]) {
          summary.information_source[instance.information_source] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
        }
        summary.information_source[instance.information_source].total += 1;
        if(!totalOnlyParam && !summary.information_source[instance.information_source].instances.includes(instance.name)) 
          summary.information_source[instance.information_source].instances.push(instance.name);
      }

      // desain_program_training
      if (summary.hasOwnProperty('desain_program_training') && instance.desain_program_training) {
        if (!summary.desain_program_training[instance.desain_program_training]) {
          summary.desain_program_training[instance.desain_program_training] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
        }
        summary.desain_program_training[instance.desain_program_training].total += 1;
        if(!totalOnlyParam && !summary.desain_program_training[instance.desain_program_training].instances.includes(instance.name)) 
          summary.desain_program_training[instance.desain_program_training].instances.push(instance.name);
      }

      // desain_program_knowledge
      if (summary.hasOwnProperty('desain_program_knowledge')) {
        if (!summary.desain_program_knowledge[instance.name]) {
          summary.desain_program_knowledge[instance.name] = instance.desain_program_knowledge;
        }
      }

      // sustainability_training
      if (summary.hasOwnProperty('sustainability_training')) {
        if (!summary.sustainability_training[instance.sustainability_training]) {
          summary.sustainability_training[instance.sustainability_training] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
        }
        summary.sustainability_training[instance.sustainability_training].total += 1;
        if(!totalOnlyParam && !summary.sustainability_training[instance.sustainability_training].instances.includes(instance.name)) 
          summary.sustainability_training[instance.sustainability_training].instances.push(instance.name);
      }

      // sustainability_knowledge
      if (summary.hasOwnProperty('sustainability_knowledge')) {
        if (!summary.sustainability_knowledge[instance.name]) {
          summary.sustainability_knowledge[instance.name] = instance.sustainability_knowledge;
        }
      }

      // social_report_training
      if (summary.hasOwnProperty('social_report_training')) {
        if (!summary.social_report_training[instance.social_report_training]) {
          summary.social_report_training[instance.social_report_training] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
        }
        summary.social_report_training[instance.social_report_training].total += 1;
        if(!totalOnlyParam && !summary.social_report_training[instance.social_report_training].instances.includes(instance.name)) 
          summary.social_report_training[instance.social_report_training].instances.push(instance.name);
      }

      // social_report_knowledge
      if (summary.hasOwnProperty('social_report_knowledge')) {
        if (!summary.social_report_knowledge[instance.name]) {
          summary.social_report_knowledge[instance.name] = instance.social_report_knowledge;
        }
      }

      // url_program_report
      if (summary.hasOwnProperty('url_program_report')) {
        if (!summary.url_program_report[instance.name]) {
          summary.url_program_report[instance.name] = instance.url_program_report;
        }
      }

      // expectation
      if (summary.hasOwnProperty('expectation')) {
        if (!summary.expectation[instance.name]) {
          summary.expectation[instance.name] = instance.expectation;
        }
      }

      // other_inquiries
      if (summary.hasOwnProperty('other_inquiries')) {
        if (!summary.other_inquiries[instance.name]) {
          summary.other_inquiries[instance.name] = instance.other_inquiries;
        }
      }

      // social_instagram
      if (summary.hasOwnProperty('social_instagram')) {
        if (!summary.social_instagram[instance.name]) {
          summary.social_instagram[instance.name] = instance.social_instagram;
        }
      }

      // social_website
      if (summary.hasOwnProperty('social_website')) {
        if (!summary.social_website[instance.name]) {
          summary.social_website[instance.name] = instance.social_website;
        }
      }

      // social_tiktok
      if (summary.hasOwnProperty('social_tiktok')) {
        if (!summary.social_tiktok[instance.name]) {
          summary.social_tiktok[instance.name] = instance.social_tiktok;
        }
      }

      // social_youtube
      if (summary.hasOwnProperty('social_youtube')) {
        if (!summary.social_youtube[instance.name]) {
          summary.social_youtube[instance.name] = instance.social_youtube;
        }
      }

      // // address_data
      // if (summary.hasOwnProperty('address_data')) {
      //   if (!summary.address_data[instance.name]) {
      //     summary.address_data[instance.name] = {
      //       street: instance.address_street,
      //       village: instance.address_village,
      //       district: instance.address_district,
      //       city: instance.address_regency,
      //       province: instance.address_province,
      //       postal_code: instance.address_postal_code,
      //     };
      //   }
      // }

      // established_year
      if (summary.hasOwnProperty('established_year')) {
        if (!summary.established_year[instance.established_year]) {
          summary.established_year[instance.established_year] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
        }
        summary.established_year[instance.established_year].total += 1;
        if(!totalOnlyParam && !summary.established_year[instance.established_year].instances.includes(instance.name)) 
          summary.established_year[instance.established_year].instances.push(instance.name);
      }

      // (cakupan) area
      if (summary.hasOwnProperty('area')) {
        if (!summary.area[instance.area]) {
          summary.area[instance.area] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
        }
        summary.area[instance.area].total += 1;
        if(!totalOnlyParam && !summary.area[instance.area].instances.includes(instance.name)) 
          summary.area[instance.area].instances.push(instance.name);
      }

      // covered areas: province
      if (summary.hasOwnProperty('covered_areas')) {
        const coveredAreas = instance.InstanceCoveredAreas;
        coveredAreas.forEach((coveredArea) => {
          const province = coveredArea.City.Province.name;

          if (!summary.covered_areas[province]) {
            summary.covered_areas[province] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
          }
          summary.covered_areas[province].total += 1;
          if(!totalOnlyParam && !summary.covered_areas[province].instances.includes(instance.name)) 
            summary.covered_areas[province].instances.push(instance.name);
        });
      }

      // alamat: province
      if (summary.hasOwnProperty('address_province')) {
        const province = instance.address_province;
        if(province)
        {
          if (!summary.address_province[province]) {
            summary.address_province[province] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
          }
          summary.address_province[province].total += 1;
          if(!totalOnlyParam && !summary.address_province[province].instances.includes(instance.name)) 
            summary.address_province[province].instances.push(instance.name);
        }
      }

      // alamat: city
      if (summary.hasOwnProperty('address_regency')) {
        const city = instance.address_regency;
        if(city)
        {
          if(!summary.address_regency[city]) {
            summary.address_regency[city] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
          }
          summary.address_regency[city].total += 1;
          // console.log(city);
          if(!totalOnlyParam && !summary.address_regency[city].instances.includes(instance.name)) 
            summary.address_regency[city].instances.push(instance.name);
          // console.log(summary.address_regency[city]);
        }
      }

      // instances_beneficiaries
      if (summary.hasOwnProperty('beneficiaries')) {
        // console.log(instance.InstanceBeneficiaries);
        instance.InstanceBeneficiaries.forEach((instance_beneficiary) => {
          if (!summary.beneficiaries[instance_beneficiary.Beneficiary.name]) {
            summary.beneficiaries[instance_beneficiary.Beneficiary.name] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
          }
          summary.beneficiaries[instance_beneficiary.Beneficiary.name].total += 1;
          if(!totalOnlyParam && !summary.beneficiaries[instance_beneficiary.Beneficiary.name].instances.includes(instance.name)) 
            summary.beneficiaries[instance_beneficiary.Beneficiary.name].instances.push(
            instance.name
          );
        });
      }

      // total_beneficiaries
      if (summary.hasOwnProperty('total_beneficiaries')) {
        if (!summary.total_beneficiaries.instances_total_beneficiaries[instance.name]) {
          summary.total_beneficiaries.instances_total_beneficiaries[instance.name] = instance.total_beneficiaries;
        }

        summary.total_beneficiaries.total += instance.total_beneficiaries;
      }

      // fund_source
      if (summary.hasOwnProperty('fund_source')) {
        instance.InstanceFundSources.forEach((instance_fund_source) => {
          if (!summary.fund_source[instance_fund_source.FundSource.name]) {
            summary.fund_source[instance_fund_source.FundSource.name] = totalOnlyParam ? { total: 0 } : { total: 0, instances: [] };
          }
          summary.fund_source[instance_fund_source.FundSource.name].total += 1;
          if(!totalOnlyParam && !summary.fund_source[instance_fund_source.FundSource.name].instances.includes(instance.name)) 
            summary.fund_source[instance_fund_source.FundSource.name].instances.push(instance.name);
        });
      }

      // participant_data
      if (summary.hasOwnProperty('participant_data')) {

        summary.participant_data.total += instance.Participants.length;
        instance.Participants.forEach((participant) => {
          // position
          if (!summary.participant_data.position[participant.position]) {
            summary.participant_data.position[participant.position] = totalOnlyParam ? { total: 0 } : { total: 0, participants: [] };
          }
          summary.participant_data.position[participant.position].total += 1;
          if(!totalOnlyParam) summary.participant_data.position[participant.position].participants.push({
            participant_number: participant.participant_number,
            name: participant.name,
            instance: instance.name,
          });

          // latest_education
          if (!summary.participant_data.latest_education[participant.latest_education]) {
            summary.participant_data.latest_education[participant.latest_education] = totalOnlyParam ? { total: 0 } : { total: 0, participants: [] };
          }
          summary.participant_data.latest_education[participant.latest_education].total += 1;
          if(!totalOnlyParam) summary.participant_data.latest_education[participant.latest_education].participants.push(
            {
              participant_number: participant.participant_number,
              name: participant.name,
              instance: instance.name,
            }
          );

          // confirmation_1
          if (!summary.participant_data.confirmation_1[participant.confirmation_1]) {
            summary.participant_data.confirmation_1[participant.confirmation_1] = totalOnlyParam ? { total: 0 } : { total: 0, participants: [] };
          }
          summary.participant_data.confirmation_1[participant.confirmation_1].total += 1;
          if(!totalOnlyParam) summary.participant_data.confirmation_1[participant.confirmation_1].participants.push({
            participant_number: participant.participant_number,
            name: participant.name,
            instance: instance.name,
          });

          // confirmation_2
          if (!summary.participant_data.confirmation_2[participant.confirmation_2]) {
            summary.participant_data.confirmation_2[participant.confirmation_2] = totalOnlyParam ? { total: 0 } : { total: 0, participants: [] };
          }
          summary.participant_data.confirmation_2[participant.confirmation_2].total += 1;
          if(!totalOnlyParam) summary.participant_data.confirmation_2[participant.confirmation_2].participants.push({
            participant_number: participant.participant_number,
            name: participant.name,
            instance: instance.name,
          });

          // confirmation_3
          if (!summary.participant_data.confirmation_3[participant.confirmation_3]) {
            summary.participant_data.confirmation_3[participant.confirmation_3] = totalOnlyParam ? { total: 0 } : { total: 0, participants: [] };
          }
          summary.participant_data.confirmation_3[participant.confirmation_3].total += 1;
          if(!totalOnlyParam) summary.participant_data.confirmation_3[participant.confirmation_3].participants.push({
            participant_number: participant.participant_number,
            name: participant.name,
            instance: instance.name,
          });
        });
      }
    });

    return res.status(200).json(successResponse(200, 'Berhasil mendapatkan rekapan data dashboard', summary));
  } catch (error) {
    res.status(500).json(errorResponse(500, 'Internal server error. ' + error.message + ' ' + error.stack));
  }
};

module.exports = {
  getDashboardSummary,
};
