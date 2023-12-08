const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { authRouter,
        adminRouter, 
        mentorRouter, 
        participantRouter, 
        registrationRouter, 
        cityRouter, 
        provinceRouter,
        dashboardSummaryRouter,  
        instanceRouter} = require('./routes/index');

const { Database } = require('./config/db');
const { errorResponse } = require('./utils/responseBuilder');

const db = Database.getInstance().getSequelizeInstance();


dotenv.config();

const port = process.env.SERVER_PORT || 5000;


const app = express();

app.use(cors(
  {
    // origin: process.env.CLIENT_URL,
    origin: '*',
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

app.use(registrationRouter);

app.use(cityRouter);
app.use(provinceRouter);

app.use(instanceRouter);

app.use(dashboardSummaryRouter);

// Handle 404 Not Found
app.use((req, res, next) => {
  res.status(404).send(errorResponse('404 Not Found', 404));
});

app.get('/', (req, res) => {
  res.send('Express Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});