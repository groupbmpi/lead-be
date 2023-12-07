## Branch: information-banner
adds crud to information-banner

## Modifications
- add information-banner model (./models/informationBanner.js)
- add routing for information-banner (./routes/informationBannerRoute.js)
- add CRUD endpoint for information-banner model (./controllers/informationBannerController.js)
- add endpoint to broadcast banner information to an email list (./controllers/informationBannerController.js)

## Model Detail
- information_banner_id (PK) (INT) (NOT NULLABLE) (AUTO INCREMENT)
- url_picture (VARCHAR) (NULLABLE)
- text (TEXT) (NOT NULLABLE)

## Endpoint Details
- POST /api/v1/task (ADMIN) - createTask
- GET /api/v1/task (ALL) - getAllTasks
- GET /api/v1/task/:id (ALL) - getTaskById
- PUT /api/v1/task/:id (ADMIN) - updateTask
- DELETE /api/v1/task/:id (ADMIN) - deleteTask
