const express = require('express');
const { sendMessageToChannel } = require('../controllers/telegramController');

const router = express.Router();

router.post('/', async (req, res) => {
    const { message } = req.body;
    const { status, data } = await sendMessageToChannel(message);

    if (status === 'OK') {
        res.send({
            route: '/telegram/',
            status: 'OK',
            data: data,
        });
    } else {
        res.send({
            route: '/telegram/',
            status: 'ERROR',
            data: data,
        });
    }
});

module.exports = router;