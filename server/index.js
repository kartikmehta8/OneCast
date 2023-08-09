const express = require('express');
const cors = require('cors');
const compression = require('./middlewares/Compression');
const clusterMiddleware = require('./middlewares/Clusters');
const dotenv = require('dotenv');
const bodyParser = require('./middlewares/BodyParser');
const morgan = require('./middlewares/Morgan');

// Routes Import
const sampleRoutes = require('./routes/sample');
const telegramRoutes = require('./routes/telegram');

dotenv.config();

const app = express();

// Middlewares
app.use(compression);
clusterMiddleware(app);
app.use(cors());
app.use(bodyParser);
app.use(morgan);

// Routes
app.use('/sample', sampleRoutes);

app.get('/', (req, res) => {
  res.send({
    server: 'Express',
    status: 'OK',
  });
});

app.use('/telegram', telegramRoutes);