const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TOKEN}`
const CHANNEL_ID = '@onecasttest'

const sendMessageToChannel = async (message) => {
    try {
        const { data } = await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: CHANNEL_ID,
            text: message,
        });
        
        return { status: 'OK', data: data };
    } catch (error) {
        return { status: 'ERROR', data: error };
    }
}

module.exports = {
    sendMessageToChannel,
};