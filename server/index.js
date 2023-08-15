const express = require('express');
const cors = require('cors');
const compression = require('./middlewares/Compression');
const clusterMiddleware = require('./middlewares/Clusters');
const dotenv = require('dotenv');
const bodyParser = require('./middlewares/BodyParser');
const morgan = require('./middlewares/Morgan');
const connectDB = require('./config/ConnectDB');

// Routes Import
const telegramRoutes = require('./routes/bots/telegram');
const discordRoutes = require('./routes/bots/discord');
const storeRoutes = require('./routes/store');
const slackRoutes = require('./routes/bots/slack');
const userRoutes = require('./routes/user');
const textApiRoutes = require('./routes/features/textApi');
const draftRoutes = require('./routes/features/draft');
const discussionRoutes = require('./routes/features/discussion');

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
app.use('/store', storeRoutes);
app.use('/telegram', telegramRoutes);
app.use('/user', userRoutes);
app.use('/discord', discordRoutes);
app.use('/slack', slackRoutes);
app.use('/text', textApiRoutes);
app.use('/draft', draftRoutes);
app.use('/discussion', discussionRoutes);

app.get('/', (req, res) => {
  res.send({
    status: 'OK',
  });
});
