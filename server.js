const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const SERVER_CONFIG = require('./config/serverConfig');

const github = require('./routes/github');

const port = process.env.PORT || SERVER_CONFIG.DEFAULT_PORT;
const nodeEnv = process.env.NODE_ENV;

const app = express();

// Security Headers
app.use(helmet())

//Logging
app.use(morgan(SERVER_CONFIG.MORGAN_FORMAT));

// Compression
app.use(compression(SERVER_CONFIG.COMPRESSION_OPTIONS))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded(SERVER_CONFIG.BODY_PARSER_OPTIONS.URL_ENCODED))

// parse application/json
app.use(bodyParser.json(SERVER_CONFIG.BODY_PARSER_OPTIONS.JSON))

app.use('/github', github);

app.get('/', (req, res) => {
  res.send('CacheApp Online!');
});

app.post('/', (req, res) => {
  res.send({
    message: 'CacheApp Online!',
    data: req.body
  });
});

app.listen(port, () => console.log(`CacheApp Online on port:${port} with env:${nodeEnv}`));
