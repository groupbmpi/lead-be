const Beneficiary = require('./../models/beneficiary');
const City = require('./../models/city');
const Instance = require('./../models/instance');
const Province = require('./../models/province');
const FundSources = require('./../models/fundsource');
const InstanceFundSource = require('./../models/instancefundsource');
const InstanceCoveredArea = require('./../models/instancecoveredarea');
const InstanceBeneficiary = require('./../models/instancebeneficiary');
const InstanceSdg = require('./../models/instancesdg');
const Sdg = require('./../models/sustainabledevelopmentgoal');
const Participant = require('./../models/participant');
const ParticipantsMentors = require('./../models/participantsmentors');

const { Database } = require('./../config/db');
const db = Database.getInstance().getSequelizeInstance();
const { errorResponse, successResponse } = require('./../utils/responseBuilder');

// const getInstancesByCoveredAreaId = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Cari semua instance yang mencakup area dengan ID yang diberikan
//     const instances = await Instance.findAll({
//       include: [{
//         model: InstanceCoveredArea,
//         where: { city_id: id },
//       }],
//     });

//     // Kirim response yang berisi list instance lengkap
//     return res.status(200).json(successResponse(200, 'Instances retrieved successfully', instances));
//   } catch (error) {
//     // Kirim response error
//     return res.status(500).json(errorResponse(500, 'Failed to retrieve instances'));
//   }
// };

// 2.3. Mentor dapat melihat status instansi yang mendaftar
// Get all instances status
// const getAllInstancesStatus = async (req, res) => {
//   try {
//     const instances = await Instance.findAll();

//     const instanceList = instances.map((instanceData) => {
//       instanceData = instanceData.toJSON();
//       const { instance_id, name, email, status } = instanceData;
//       return { instance_id, name, email, status }; // output based on figma
//     });


//     return res.status(200).json(successResponse(200, 'Instances retrieved successfully', instanceList));
//   } catch (error) {
//     return res.status(500).json(errorResponse(500, `Failed to retrieve instances. ${error}`));
//   }
// };


const checkStatusByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const instance = await Instance.findOne({
      where: { email },
      attributes: ['name', 'status'],
    });

    if (!instance) {
      return res.status(404).json(errorResponse(404, 'Instance not found'));
    }

    return res.status(200).json(successResponse(200, 'Instance found', { name: instance.name, status: instance.status } ));
  } catch (error) {
    return res.status(500).json(errorResponse(500, `Internal server error. ${error}`));
  }
};

// // Get instances.name list with filter
// const getInstancesName = async (req, res) => {
//   try {
//     const {
//       type,
//       sector,
//       established_year,
//       area,
//       province,
//       city,
//       instances_beneficiaries,
//       fund_source,
//     } = req.query;

//     // get all instances
//     const instances = await Instance.findAll();

//     // filter instances
//     const filteredInstances = filter(instances, {
//       type,
//       sector,
//       established_year,
//       area,
//       province,
//       city,
//       instances_beneficiaries,
//       fund_source,
//     });

//     // get instances name
//     const instancesName = filteredInstances.map((instance) => instance.name);

//     return res.status(200).json(successResponse(200, 'Instances retrieved successfully', instancesName));
//   } catch (error) {
//     return res.status(500).json(errorResponse(500, 'Failed to retrieve instances'));
//   }
// }


const getInstanceById = async (req, res) => {
  const { id } = req.params;

  try {
    const instance = await Instance.findByPk(id);
    if (!instance) {
      return res.status(404).json(errorResponse(404, 'Instance not found'));
    }
    return res.status(200).json(successResponse(200, 'Instance retrieved successfully', instance));
  } catch (error) {
    return res.status(500).json(errorResponse(500, 'Failed to retrieve instance'));
  }
};

const updateInstanceById = async (req, res) => {
  try {
      const { id } = req.params;

      const instance = await Instance.findByPk(id);
      if (!instance) {
        return res.status(404).json(errorResponse(404, 'Instance not found'));
      }

      const participants = await Participant.findAll({
        where: { instance_id: id },
      });

      if(!participants)
        return res.status(404).json(errorResponse(404, 'Participants not found'));

      const authorizedAccess = req.userData.role === 'SUPERADMIN'? true : participants.some((participant) => {
        return participant.participant_id === req.userData.id && req.userData.role === 'PARTICIPANT';
      });
      
      if (!authorizedAccess) {
        return res.status(403).json(errorResponse(403, 'Forbidden access'));
      }

      const result = await instance.update(req.body);
      if(result) return res.status(200).json(successResponse(200, 'Instance updated successfully', instance));
  } catch (error) {
    return res.status(500).json(errorResponse(500, `Failed to update instance. ${error}.`));
  }
};

const deleteInstanceById = async (req, res) => {
  const { id } = req.params;

  try {
    await db.transaction(async (t) => {
      const instance = await Instance.findByPk(id);
      if (!instance) {
        return res.status(404).json(errorResponse(404, 'Instance not found'));
      }

      const participants = await Participant.findAll({
        where: { instance_id: id },
      });

      for (let participant of participants) {
        // Delete all references in participants_mentors table
        await ParticipantsMentors.destroy({
          where: { participant_id: participant.participant_id },
          transaction: t
        });

        // Delete the participant
        await participant.destroy({ transaction: t });
      }

      // Delete the related records in instance_fund_sources table
      await InstanceFundSource.destroy({
        where: { instance_id: instance.instance_id },
        transaction: t
      });

      await instance.destroy({ transaction: t });
      return res.status(200).json(successResponse(200, 'Instance deleted successfully', {
        instance_id: instance.instance_id,
        name: instance.name,
        email: instance.email,
        participants: participants.map((participant) => participant.name),
      }));
    });
  } catch (error) {
    return res.status(500).json(errorResponse(500, 'Failed to delete instance.' + error));
  }
};


// get all instances with filter
const getInstances = async (req, res) => {
  try {
    const filter = req.query;
    const include = req.query.include ? req.query.include.split(',').map(item => item.trim()) : ['all'];

    const allowedFilterFields = [
      'batch',
      'type',
      'sector',
      'focus',
      'status',
      'email',
      'established_year',
      'area',
      'province',
      'city',
      'instances_beneficiaries',
      'fund_source',
      'stable_fund_source',
      'information_source',
      'desain_program_training',
      'sustainability_training',
      'social_report_training',
      'covered_area_id',
      'covered_area_city_name',
      'covered_area_province_name',
      'include'
    ];
    const filterFields = Object.keys(filter);
    const isFilterInvalid = filterFields.some((field) => !allowedFilterFields.includes(field));

    let filteredInstances;

    if (isFilterInvalid) {
      return res.status(400).json(errorResponse(400, `Invalid query params: ${filterFields.join(', ')}`));
    }

    if (filterFields.length === 0) {
      filteredInstances = await Instance.findAll({
        include: [
          { model: InstanceBeneficiary, include: [ { model: Beneficiary, attributes: ['name'] } ] },
          { model: InstanceFundSource, include: [ { model: FundSources, attributes: ['name'], }, ] },
          { model: InstanceSdg, include: [ { model: Sdg, attributes: ['name'] } ] },
          { model: InstanceCoveredArea, include: [ { model: City, attributes: ['name'], include: [ { model: Province, attributes: ['name'] } ] } ] },
        ],
      });
    }

    if(filter.email) {
      filteredInstances = await Instance.findOne({
        where: { email: filter.email },
        include: [
          { model: InstanceBeneficiary, include: [ { model: Beneficiary, attributes: ['name'] } ] },
          { model: InstanceFundSource, include: [ { model: FundSources, attributes: ['name'], }, ] },
          { model: InstanceSdg, include: [ { model: Sdg, attributes: ['name'] } ] },
          { model: InstanceCoveredArea, include: [ { model: City, attributes: ['name'], include: [ { model: Province, attributes: ['name'] } ] } ] },
        ],
      });

    } else if (filter.batch || filter.type || filter.focus || filter.sector || filter.established_year || filter.stable_fund_source || filter.information_source || filter.desain_program_training || filter.sustainability_training || filter.social_report_training || filter.area || filter.province || filter.city || filter.instances_beneficiaries || filter.fund_source || filter.status) {
      const where = {};
 
      if (filter.type) where.type = filter.type;
      if (filter.sector) where.sector = filter.sector;
      if (filter.focus) where.focus = filter.focus;
      if (filter.batch) where.batch = filter.batch;
      if (filter.stable_fund_source) where.stable_fund_source = filter.stable_fund_source;
      if (filter.information_source) where.information_source = filter.information_source;
      if (filter.desain_program_training) where.desain_program_training = filter.desain_program_training;
      if (filter.sustainability_training) where.sustainability_training = filter.sustainability_training;
      if (filter.social_report_training) where.social_report_training = filter.social_report_training;
      if (filter.established_year) where.established_year = filter.established_year;
      if (filter.area) where.area = filter.area;
      if (filter.province) where.address_province = filter.province;
      if (filter.city) where.address_city = filter.city;
      if (filter.instances_beneficiaries) where.instances_beneficiaries = filter.instances_beneficiaries;
      if (filter.fund_source) where.fund_source = filter.fund_source;
      if (filter.status) where.status = filter.status;

      filteredInstances = await Instance.findAll({
        where: where,
        include: [
          { model: InstanceBeneficiary, include: [ { model: Beneficiary, attributes: ['name'] } ] },
          { model: InstanceFundSource, include: [ { model: FundSources, attributes: ['name'], }, ] },
          { model: InstanceSdg, include: [ { model: Sdg, attributes: ['name'] } ] },
          { model: InstanceCoveredArea, include: [ { model: City, attributes: ['name'], include: [ { model: Province, attributes: ['name'] } ] } ] },
        ],
      });
    } 
    else if(filter.covered_area_id || filter.covered_area_city_name)
    {
      let coveredAreaId;
      if(!filter.covered_area_id && filter.covered_area_city_name)
      {
        const coveredArea = await City.findOne({
          where: { name: filter.covered_area_city_name }
        });

        if(!coveredArea)
          return res.status(404).json(errorResponse(404, `Covered area with name ${filter.covered_area_city_name} not found`));

        coveredAreaId = coveredArea.city_id;
      } else {
        coveredAreaId = filter.covered_area_id;
      }

       filteredInstances = await Instance.findAll({
        include: [
          { model: InstanceBeneficiary, include: [ { model: Beneficiary, attributes: ['name'] } ] },
          { model: InstanceFundSource, include: [ { model: FundSources, attributes: ['name'], }, ] },
          { model: InstanceSdg, include: [ { model: Sdg, attributes: ['name'] } ] },
          { model: InstanceCoveredArea, include: [ { model: City, attributes: ['name'], include: [ { model: Province, attributes: ['name'] } ] } ] },
        ],
        where: {
          '$InstanceCoveredAreas.city_id$': coveredAreaId
        },
      });
    } 
    else if(filter.covered_area_province_name)
    {
      const coveredArea = await Province.findOne({
        where: { name: filter.covered_area_province_name }
      });

      if(!coveredArea)
        return res.status(404).json(errorResponse(404, `Covered area with name ${filter.covered_area_province_name} not found`));

      filteredInstances = await Instance.findAll({
        include: [
          { model: InstanceBeneficiary, include: [ { model: Beneficiary, attributes: ['name'] } ] },
          { model: InstanceFundSource, include: [ { model: FundSources, attributes: ['name'], }, ] },
          { model: InstanceSdg, include: [ { model: Sdg, attributes: ['name'] } ] },
          { model: InstanceCoveredArea, include: [ { model: City, attributes: ['name'], include: [ { model: Province, attributes: ['name'] } ] } ] },
        ],
        where: {
          '$InstanceCoveredAreas.City.Province.name$': filter.covered_area_province_name
        },
      });
    }
    else 
    {
      filteredInstances = await Instance.findAll({
        include: [
          { model: InstanceBeneficiary, include: [ { model: Beneficiary, attributes: ['name'] } ] },
          { model: InstanceFundSource, include: [ { model: FundSources, attributes: ['name'], }, ] },
          { model: InstanceSdg, include: [ { model: Sdg, attributes: ['name'] } ] },
          { model: InstanceCoveredArea, include: [ { model: City, attributes: ['name'], include: [ { model: Province, attributes: ['name'] } ] } ] },
        ],
      });
    }
    
    

    // check if it an object or array
    if(!Array.isArray(filteredInstances))
      return res.status(200).json(successResponse(200, 'Instances retrieved successfully', await buildInstanceResponseData(filteredInstances, include)));
    else {
      const instances = await Promise.all(filteredInstances.map(async (instance) => await buildInstanceResponseData(instance, include)));
      return res.status(200).json(successResponse(200, 'Instances retrieved successfully', instances));
    }
    } catch (error) {
    return res.status(500).json(errorResponse(500, `Failed to retrieve instances. ${error}.`));
  }
};


const buildInstanceResponseData = async (instance, include) => {
  let data =  {
    instance_id: include.includes('instance_id') || include.includes('all') ? instance.instance_id: undefined,
    batch: include.includes('batch') || include.includes('all') ? instance.batch: undefined,
    type: include.includes('type') || include.includes('all') ? instance.type: undefined,
    name: include.includes('name') || include.includes('all') ? instance.name: undefined,
    email: (include.includes('email') || include.includes('all')) ? instance.email: undefined,
    sector: include.includes('sector') || include.includes('all')?instance.sector: undefined,
    focus: include.includes('focus') || include.includes('all')? instance.focus: undefined,
    established_month: include.includes('established_month') || include.includes('all')? instance.established_month: undefined,
    established_year: include.includes('established_year') || include.includes('all')? instance.established_year: undefined,
    area: include.includes('area') || include.includes('all')? instance.area: undefined,
    instance_covered_area: !include.includes('instance_covered_area') && !include.includes('all')? undefined: instance.InstanceCoveredAreas.map((instanceCoveredArea) => {
      return {
        province: instanceCoveredArea.City.Province.name,
        city: instanceCoveredArea.City.name
      };
    }),
    stable_fund_source: include.includes('stable_fund_source') || include.includes('all')? instance.stable_fund_source: undefined,
    information_source: include.includes('information_source') || include.includes('all')? instance.information_source: undefined,
    desain_program_training: include.includes('desain_program_training') || include.includes('all')? instance.desain_program_training: undefined,
    desain_program_knowledge: include.includes('desain_program_knowledge') || include.includes('all')? instance.desain_program_knowledge: undefined,
    sustainability_training: include.includes('sustainability_training') || include.includes('all')? instance.sustainability_training: undefined,
    sustainability_knowledge: include.includes('sustainability_knowledge') || include.includes('all')? instance.sustainability_knowledge: undefined,
    social_report_training: include.includes('social_report_training') || include.includes('all')? instance.social_report_training: undefined,
    social_report_knowledge: include.includes('social_report_knowledge') || include.includes('all')? instance.social_report_knowledge: undefined,
    beneficiaries: !include.includes('beneficiaries') && !include.includes('all')? undefined: instance.InstanceBeneficiaries.map((instanceBeneficiary) => instanceBeneficiary.Beneficiary.name),
    total_beneficiaries: !include.includes('total_beneficiaries') && !include.includes('all')? undefined:  instance.total_beneficiaries,
    expectation: !include.includes('expectation') && !include.includes('all')? undefined:  instance.expectation,
    other_inquiries: !include.includes('other_inquiries') && !include.includes('all')? undefined:  instance.other_inquiries,
    instance_fund_source: !include.includes('instance_fund_source') && !include.includes('all')? undefined:  instance.InstanceFundSources.map((instanceFundSource) => instanceFundSource.FundSource.name),
    instance_sdg: !include.includes('instance_sdg') && !include.includes('all')? undefined:  instance.InstanceSdgs.map((instanceSdg) => instanceSdg.SustainableDevelopmentGoal.name),
    description: !include.includes('description') && !include.includes('all')? undefined:  instance.description,
    address_street: !include.includes('address_street') && !include.includes('all')? undefined:  instance.address_street,
    address_village: !include.includes('address_village') && !include.includes('all')? undefined:  instance.address_village,
    address_district: !include.includes('address_district') && !include.includes('all')? undefined:  instance.address_district,
    address_regency: !include.includes('address_regency') && !include.includes('all')? undefined:  instance.address_regency,
    address_province: !include.includes('address_province') && !include.includes('all')? undefined:  instance.address_province,
    address_postal_code: !include.includes('address_postal_code') && !include.includes('all')? undefined:  instance.address_postal_code,
    url_company_profile: !include.includes('url_company_profile') && !include.includes('all')? undefined:  instance.url_company_profile,
    url_program_proposal: !include.includes('url_program_proposal') && !include.includes('all')? undefined:  instance.url_program_proposal,
    url_report_program: !include.includes('url_report_program') && !include.includes('all')? undefined:  instance.url_report_program,
    social_instagram: !include.includes('social_instagram') && !include.includes('all')? undefined:  instance.social_instagram,
    social_website: !include.includes('social_website') && !include.includes('all')? undefined:  instance.social_website,
    social_tiktok: !include.includes('social_tiktok') && !include.includes('all')? undefined:  instance.social_tiktok,
    social_youtube: !include.includes('social_youtube') && !include.includes('all')? undefined:  instance.social_youtube,
    status: !include.includes('status') && !include.includes('all')? undefined:  instance.status,
  }
  
  return include.length === 1 && !include.includes('all') ? data[include[0]]: data; 
}


module.exports = {
  getInstances,
  getInstanceById,
  // getInstancesName,
  // getInstancesByCoveredAreaId,
  // getAllInstancesStatus,
  checkStatusByEmail,
  updateInstanceById,
  deleteInstanceById,
};
