
const InformationBanner = require('../models/informationBanner');
const transporter = require('../config/mailer');

const createInformationBanner = async (req, res) => {
    try {
        const { url_picture, text } = req.body;
        console.log(req.body);
        const newBanner = await InformationBanner.create({ 
            url_picture, 
            text 
    });
        res.status(201).json(201, 'Banner created', newBanner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAllInformationBanners =  async (req, res) => {
    try {
        const banners = await InformationBanner.findAll();
        res.status(200).json(banners);
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, error.message));
    }
}

const getInformationBannerById = async (req, res) => {
    try {
        const banner = await InformationBanner.findByPk(req.params.id);
        if (banner) {
            res.status(200).json(banner);
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, error.message));
    }
}

const updateInformationBanner = async (req, res) => {
    try {
        const { url_picture, text } = req.body;
        const updatedBanner = await InformationBanner.update(
            { url_picture, text },
            { where: { id: req.params.id } }
        );
        if (updatedBanner[0] === 1) {
            res.status(200).json({ message: 'Banner updated successfully' });
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (error) {
      console.error(error);
      res.status(500).json(errorResponse(500, error.message));
    }
}

const deleteInformationBanner = async (req, res) => {
    try {
        const banner = await InformationBanner.findByPk(req.params.id);
  
        if (banner) {
            await banner.destroy();
            res.status(200).json({ message: `Banner ID:${req.params.id} deleted successfully` });
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse(500, error.message));
    }
}

const sendBannerContentById = async (req, res) => {
    try {
      const { recipientEmails } = req.body;
      console.log(req.body);
  
      // Fetch the banner information
      const banner = await InformationBanner.findByPk(req.params.id);
  
      if (!banner) {
        return res.status(404).json({ message: 'Banner not found' });
      }
  
      // Construct email content
      const emailContent = `
        INFORMATION BANNER:
        URL Picture: ${banner.url_picture}
        Text: ${banner.text}
      `;
  
      // Send email
      await transporter.sendMail({
        to: recipientEmails.join(','),
        subject: 'Information Banner',
        text: emailContent,
      });
  
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createInformationBanner, 
    getAllInformationBanners, 
    getInformationBannerById, 
    updateInformationBanner, 
    deleteInformationBanner,
    sendBannerContentById
};
