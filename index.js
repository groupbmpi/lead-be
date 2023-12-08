const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const {db} = require('./config/db');
const adminRouter = require('./routes/adminRoute');
const informationBannerRouter = require('./routes/informationBannerRoute');

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
    // origin: process.env.CLIENT_URL,
    origin: '*',
    credentials: true,
  },
));

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(adminRouter);
app.use(informationBannerRouter);

app.get('/', (req, res) => {
  res.send('Express Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});