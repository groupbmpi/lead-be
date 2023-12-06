## Branch: information-banner
adds crud to information-banner

## Modifications
- add information-banner model (./models/informationBanner.js)
- add routing for information-banner (./routes/informationBannerRoute.js)
- add CRUD endpoint for information-banner model (./controllers/informationBannerController.js)

## Model Detail
- information_banner_id (PK) (INT) (NOT NULLABLE) (AUTO INCREMENT)
- url_picture (VARCHAR) (NULLABLE)
- text (TEXT) (NOT NULLABLE)

## Endpoint Details
- /api/v1/informationBanner (POST) (ADMINS) - createInformationBanner
- /api/v1/informationBanner (GET) (ALL) - getAllInformationBanners
- /api/v1/informationBanner/:id (GET) (ALL) - getInformationBannerById
- /api/v1/informationBanner/:id (PUT) (ADMINS) - updateInformationBanner
- /api/v1/informationBanner/:id (DEL) (ADMINS) - deleteInformationBanner
