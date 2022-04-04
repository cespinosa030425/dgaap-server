const path = require('path');
const data = require('dotenv').config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
});

module.exports = {
    AUTH_SECRET: data.parsed.AUTH_SECRET,
    AUTH_EXPIRES: data.parsed.AUTH_EXPIRES,
    AUTH_ROUNDS: data.parsed.AUTH_ROUNDS
};