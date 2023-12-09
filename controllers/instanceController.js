const Instance = require('../models/instance');

const { errorResponse, successResponse } = require('../utils/responseBuilder');
const { filter } = require('../utils/filtering');

const getInstancesByCoveredAreaId = async (req, res) => {
    try {
      const { cityId } = req.params;
  
      // Cari semua instance yang mencakup area dengan ID yang diberikan
      const instances = await Instance.findAll({
        include: [{
          model: InstanceCoveredArea,
          where: { city_id: cityId },
        }],
      });
  
      // Kirim response yang berisi list instance lengkap
      return res.status(200).json(successResponse(200, 'Instances retrieved successfully', instances));
    } catch (error) {
      // Kirim response error
      return res.status(500).json(errorResponse(500, 'Failed to retrieve instances'));
    }
  };
  
  // 2.3. Mentor dapat melihat status instansi yang mendaftar
  // Get all instances status
    const getAllInstancesStatus = async (req, res) => {
        try {
            const instances = await Instance.findAll();
            
            const instanceList = instances.map((instanceData) => {
                instanceData = instanceData.toJSON();
                const { instance_id, name, email, status } = instanceData;
                return { instance_id, name, email, status };
            });


            return res.status(200).json(successResponse(200, 'Instances retrieved successfully', instanceList));
        } catch (error) {
            return res.status(500).json(errorResponse(500, `Failed to retrieve instances. ${error}` ));
        }
    };

    
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


    const createInstance = async (req, res) => {
      try {
        const instance = await Instance.create(req.body);
        return res.status(201).json(successResponse(201, 'Instance created successfully', instance));
      } catch (error) {
        return res.status(500).json(errorResponse(500, 'Failed to create instance'));
      }
    };

    // Get instances.name list with filter
    const getInstancesName = async (req, res) => {
      try {
        // params filter
        const { 
          type,
          cluster,
          established_year,
          area,
          province,
          city,
          instances_beneficiaries,
          fund_source,
        } = req.params;

        // get all instances
        const instances = await Instance.findAll();

        // filter instances
        const filteredInstances = filter(instances, {
          type,
          cluster,
          established_year,
          area,
          province,
          city,
          instances_beneficiaries,
          fund_source,
        });

        // get instances name
        const instancesName = filteredInstances.map((instance) => instance.name);

        return res.status(200).json(successResponse(200, 'Instances retrieved successfully', instancesName));
      } catch (error) {
        return res.status(500).json(errorResponse(500, 'Failed to retrieve instances'));
      }
    }


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
      const { id } = req.params;

      try {
        const instance = await Instance.findByPk(id);
        if (!instance) {
          return res.status(404).json(errorResponse(404, 'Instance not found'));
        }
        await instance.update(req.body);
        return res.status(200).json(successResponse(200, 'Instance updated successfully', instance));
      } catch (error) {
        return res.status(500).json(errorResponse(500, 'Failed to update instance'));
      }
    };

    const getInstanceIdByEmail = async (req, res) => {
      const { email } = req.params;

      try {
        const instance = await Instance.findOne({ where: { email } });
        if (!instance) {
          return res.status(404).json(errorResponse(404, 'Instance not found'));
        }
        return res.status(200).json(successResponse(200, 'Instance retrieved successfully', instance.instance_id));
      } catch (error) {
        return res.status(500).json(errorResponse(500, 'Failed to retrieve instance'));
      }
    }

    const deleteInstanceById = async (req, res) => {
      const { id } = req.params;

      try {
        const instance = await Instance.findByPk(id);
        if (!instance) {
          return res.status(404).json(errorResponse(404, 'Instance not found'));
        }
        await instance.destroy();
        return res.status(200).json(successResponse(200, 'Instance deleted successfully'));
      } catch (error) {
        return res.status(500).json(errorResponse(500, 'Failed to delete instance'));
      }
    };


    // get all instances with filter
    const getInstances = async (req, res) => {
      try {
        // params filter
        const { 
          type,
          cluster,
          established_year,
          area,
          province,
          city,
          instances_beneficiaries,
          fund_source,
          status,
        } = req.params;

        // get all instances
        const instances = await Instance.findAll();
        const filteredInstances = instances;
        console.log(req.params);
        if(req.params){
        // filter instances
        filteredInstances = filteredInstances.filter((instance) => {
          if ((type && instance.type === type)) return true;
          if (cluster && instance.cluster === cluster) return true;
          if (established_year && instance.established_year === established_year) return true;
          if (area && instance.area === area) return true;
          if (province && instance.province === province) return true;
          if (city && instance.city === city) return true;
          if (instances_beneficiaries && instance.instances_beneficiaries === instances_beneficiaries) return true;
          if (fund_source && instance.fund_source === fund_source) return true;
          if (status && instance.status === status) return true;
        });
      }

        return res.status(200).json(successResponse(200, 'Instances retrieved successfully', filteredInstances));
      } catch (error) {
        return res.status(500).json(errorResponse(500, `Failed to retrieve instances. ${error}`));
      }
    };

    


    module.exports = {
      getInstances,
      getInstancesName,
      getInstanceIdByEmail,
      getInstancesByCoveredAreaId,
      getAllInstancesStatus,
      checkStatusByEmail,
      createInstance,
      getInstanceById,
      updateInstanceById,
      deleteInstanceById,
    };
        