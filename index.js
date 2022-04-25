const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const env = require('./utils/home');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.urlencoded({limit: '50mb'}));
// app.use(bodyParser({limit: '50mb'}));

app.use(cors());

app.use(express.json());

app.use(env.ROOT_API, apiRouter);

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`)
});

