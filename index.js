const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const adminRouter = require('./routes/adminRoute');

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

app.use(adminRouter);

app.get('/', (req, res) => {
  res.send('Express Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});