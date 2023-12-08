
// Import model
const Instance = require('../models/instance');
const Participant = require('../models/participant');
const City = require('../models/city');
const Province = require('../models/province');
const InstanceBeneficiary = require('../models/instancebeneficiary');
const Beneficiary = require('../models/beneficiary');
const InstanceCoveredArea = require('../models/instancecoveredarea');
const FundSource = require('../models/fundsource');

const { errorResponse, successResponse } = require('../utils/responseBuilder');
const InstanceFundSource = require('../models/instancefundsource');

const getDashboardSummary = async (req, res) => {
  try {
    // Extract include and status parameters
    const includeParams = req.query.include ? req.query.include.split(',') : ["all"];
    const statusParam = req.query.status ? req.query.status : 'all';

    // Inisialisasi summary
    let summary = {};
    if (includeParams.includes('type') || includeParams.includes('all')) summary.type = {};
    if (includeParams.includes('sector') || includeParams.includes('all')) summary.sector = {};
    if (includeParams.includes('established_year') || includeParams.includes('all')) summary.established_year = {};
    // if (includeParams.includes('province') || includeParams.includes('all')) summary.province = {};
    // if (includeParams.includes('city') || includeParams.includes('all')) summary.city = {};
    if (includeParams.includes('area') || includeParams.includes('all')) summary.area = {};
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
        } else if (param === 'participants') {
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
          summary.type[instance.type] = {
            total: 0,
            instances: [],
          };
        }
        summary.type[instance.type].total += 1;
        summary.type[instance.type].instances.push(instance.name);
      }

      // sector
      if (summary.hasOwnProperty('sector')) {
        if (!summary.sector[instance.sector]) {
          summary.sector[instance.sector] = {
            total: 0,
            instances: [],
          };
        }
        summary.sector[instance.sector].total += 1;
        summary.sector[instance.sector].instances.push(instance.name);
      }

      // established_year
      if (summary.hasOwnProperty('established_year')) {
        if (!summary.established_year[instance.established_year]) {
          summary.established_year[instance.established_year] = {
            total: 0,
            instances: [],
          };
        }
        summary.established_year[instance.established_year].total += 1;
        summary.established_year[instance.established_year].instances.push(instance.name);
      }

      // (cakupan) area
      if (summary.hasOwnProperty('area')) {
        if (!summary.area[instance.area]) {
          summary.area[instance.area] = {
            total: 0,
            instances: [],
          };
        }
        summary.area[instance.area].total += 1;
        summary.area[instance.area].instances.push(instance.name);
      }

      // covered areas: province
      if (summary.hasOwnProperty('covered_areas')) {
        const coveredAreas = instance.InstanceCoveredAreas;
        console.log(instance);
        coveredAreas.forEach((coveredArea) => {
          const province = coveredArea.City.Province.name;

          if (!summary.covered_areas[province]) {
            summary.covered_areas[province] = {
              total: 0,
              instances: [],
            };
          }
          summary.covered_areas[province].total += 1;
          summary.covered_areas[province].instances.push(instance.name);
        });
      }

      // // alamat: province
      // if (summary.hasOwnProperty('address_province')) {
      //   const province = Province.findOne({ where: { province_id: instance.address_province } }).name;
      //   if (!summary.province[province]) {
      //     summary.province[province] = {
      //       total: 0,
      //       instances: [],
      //     };
      //   }
      //   summary.province[province].total += 1;
      //   summary.province[province].instances.push(instance.name);
      // }

      // // alamat: city
      // if (summary.hasOwnProperty('address_regency')) {
      //   const city = City.findOne({ where: { city_id: instance.address_regency } }).name;
      //   if (!summary.city[city]) {
      //     summary.city[city] = {
      //       total: 0,
      //       instances: [],
      //     };
      //   }
      //   summary.city[city].total += 1;
      //   summary.city[city].instances.push(instance.name);
      // }

      // instances_beneficiaries
      if (summary.hasOwnProperty('beneficiaries')) {
        instance.InstanceBeneficiaries.forEach((instance_beneficiary) => {
          if (!summary.beneficiaries[instance_beneficiary.Beneficiary.name]) {
            summary.beneficiaries[instance_beneficiary.Beneficiary.name] = {
              total: 0,
              instances: [],
            };
          }
          summary.beneficiaries[instance_beneficiary.Beneficiary.name].total += 1;
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
            summary.fund_source[instance_fund_source.FundSource.name] = {
              total: 0,
              instances: [],
            };
          }
          summary.fund_source[instance_fund_source.FundSource.name].total += 1;
          summary.fund_source[instance_fund_source.FundSource.name].instances.push(instance.name);
        });
      }

      // participant_data
      if (summary.hasOwnProperty('participant_data')) {

        summary.participant_data.total += instance.Participants.length;
        instance.Participants.forEach((participant) => {
          // position
          if (!summary.participant_data.position[participant.position]) {
            summary.participant_data.position[participant.position] = {
              total: 0,
              participants: [],
            };
          }
          summary.participant_data.position[participant.position].total += 1;
          summary.participant_data.position[participant.position].participants.push({
            participant_number: participant.participant_number,
            name: participant.name,
            instance: instance.name,
          });

          // latest_education
          if (!summary.participant_data.latest_education[participant.latest_education]) {
            summary.participant_data.latest_education[participant.latest_education] = {
              total: 0,
              participants: [],
            };
          }
          summary.participant_data.latest_education[participant.latest_education].total += 1;
          summary.participant_data.latest_education[participant.latest_education].participants.push(
            {
              participant_number: participant.participant_number,
              name: participant.name,
              instance: instance.name,
            }
          );

          // confirmation_1
          if (!summary.participant_data.confirmation_1[participant.confirmation_1]) {
            summary.participant_data.confirmation_1[participant.confirmation_1] = {
              total: 0,
              participants: [],
            };
          }
          summary.participant_data.confirmation_1[participant.confirmation_1].total += 1;
          summary.participant_data.confirmation_1[participant.confirmation_1].participants.push({
            participant_number: participant.participant_number,
            name: participant.name,
            instance: instance.name,
          });

          // confirmation_2
          if (!summary.participant_data.confirmation_2[participant.confirmation_2]) {
            summary.participant_data.confirmation_2[participant.confirmation_2] = {
              total: 0,
              participants: [],
            };
          }
          summary.participant_data.confirmation_2[participant.confirmation_2].total += 1;
          summary.participant_data.confirmation_2[participant.confirmation_2].participants.push({
            participant_number: participant.participant_number,
            name: participant.name,
            instance: instance.name,
          });

          // confirmation_3
          if (!summary.participant_data.confirmation_3[participant.confirmation_3]) {
            summary.participant_data.confirmation_3[participant.confirmation_3] = {
              total: 0,
              participants: [],
            };
          }
          summary.participant_data.confirmation_3[participant.confirmation_3].total += 1;
          summary.participant_data.confirmation_3[participant.confirmation_3].participants.push({
            participant_number: participant.participant_number,
            name: participant.name,
            instance: instance.name,
          });
        });
      }
    });

    return res.status(200).json(successResponse(200, 'Berhasil mendapatkan rekapan data dashboard', summary));
  } catch (error) {
    res.status(500).json(errorResponse(500, error.message + ' ' + error.stack));
  }
};

module.exports = {
  getDashboardSummary,
};
