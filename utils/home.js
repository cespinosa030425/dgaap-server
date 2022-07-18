const path = require('path');
const data = require('dotenv').config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
});

module.exports = {
    PORT: data.parsed.PORT,
    ROOT_API: data.parsed.ROOT_API,
    SOCKET_URL: data.parsed.SOCKET_URL
};