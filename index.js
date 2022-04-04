const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const env = require('./utils/home');

const app = express();

app.use(cors());

app.use(express.json());

app.use(env.ROOT_API, apiRouter);

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`)
});

