
## Branch: information-banners
adds crud to information-banners

## Modifications
- add information-banner model (./models/informationBanner.js)
- add routing for information-banner (./routes/informationBannerRoute.js)
- add CRUD endpoint for information-banner model (./controllers/informationBannerController.js)
- add endpoint to broadcast banner information to an email list (./controllers/informationBannerController.js)
- add mailer utility for broadcast feature (./config/mailer.js)
- modify .env -> add some new entries for mailer.js config (./.env)

## Model Detail
- information_banner_id (PK) (INT) (NOT NULLABLE) (AUTO INCREMENT)
- url_picture (VARCHAR) (NULLABLE)
- text (TEXT) (NOT NULLABLE)

## Endpoint Details
- POST `/api/v1/informationBanner` (SUPERADMIN) - createInformationBanner
- GET `/api/v1/informationBanner` (ALL) - getAllInformationBanners
- GET `/api/v1/informationBanner/:id` (ALL) - getInformationBannerById
- PUT `/api/v1/informationBanner/:id` (SUPERADMIN) - updateInformationBanner
- DELETE `/api/v1/informationBanner/:id` (SUPERADMIN) - deleteInformationBanner
- POST `/api/v1/informationBanner/send/:id` (SUPERADMIN) - sendBannerContentById

## Special Notes
- Buat `sendBannerContentById` harus ada email pengirim yang di define di `.env` dan `./config/mailer.js`. 
- Untuk sekarang bisa pake akun gmail, akun gmailnya harus ada 2FA biar bisa generate app_password
- app_password itu pass yang digunain buat authenticate ke email pengirim
