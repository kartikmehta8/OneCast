const express = require('express');
const cors = require('cors');
const compression = require('./middlewares/Compression');
const clusterMiddleware = require('./middlewares/Clusters');
const dotenv = require('dotenv');
const bodyParser = require('./middlewares/BodyParser');
const morgan = require('./middlewares/Morgan');
const connectDB = require('./config/ConnectDB');

// Routes Import
const sampleRoutes = require('./routes/sample');
const telegramRoutes = require('./routes/telegram');
const discordRoutes = require('./routes/discord');
const storeRoutes = require('./routes/store');
const userRoutes = require('./routes/user');

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(compression);
clusterMiddleware(app);
app.use(cors());
app.use(bodyParser);
app.use(morgan);

// Routes
app.use('/sample', sampleRoutes);
app.use('/store', storeRoutes);
app.use('/telegram', telegramRoutes);
app.use('/discord', discordRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send({
    server: 'Express',
    status: 'OK',
  });
});
