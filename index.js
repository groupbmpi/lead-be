const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const { authRouter,
        adminRouter,
        participantRouter,
        registrationRouter,
        mentorRouter,
        taskRouter,
        taskSubmissionRouter,
        instanceRouter,
        cityRouter,
        provinceRouter,
        dashboardSummaryRouter, 
        informationBannerRouter, 
        mentoringRouter } = require('./routes/index');

const { Database } = require('./config/db');
const { errorResponse } = require('./utils/responseBuilder');

const db = Database.getInstance().getSequelizeInstance();

const port = process.env.SERVER_PORT || 5000;
const app = express();

dotenv.config();
db.authenticate()
  .then(() => {
    console.log('[server]: Connected to the database');
    return db.sync(); // Synchronize models with the database
  })
  .then(() => {
    console.log('[server]: Models synchronized with the database');
  })
  .catch((error) => {
    console.error('[server]: Error connecting to the database:', error);
  });

app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    // origin: '*',
    credentials: true,
  },
));

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(authRouter);
app.use(adminRouter);
app.use(mentorRouter);
app.use(participantRouter);

app.use(mentoringRouter);
app.use(taskRouter);
app.use(taskSubmissionRouter);

app.use(registrationRouter);

app.use(cityRouter);
app.use(provinceRouter);

app.use(instanceRouter);

app.use(dashboardSummaryRouter);
app.use(informationBannerRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Express Server');
});

// Handle 404 Not Found
app.use((req, res, next) => {
  res.status(404).send(errorResponse('404 Not Found', 404));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});