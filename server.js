const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const SERVER_CONFIG = require('./config/serverConfig');

const port = process.env.PORT || SERVER_CONFIG.DEFAULT_PORT;
const nodeEnv = process.env.NODE_ENV;

const app = express();

//Logging
app.use(morgan(SERVER_CONFIG.MORGAN_FORMAT));

// Compression
app.use(compression(SERVER_CONFIG.COMPRESSION_OPTIONS))

app.get('/', (req, res) => {
  res.send('CacheApp Online!');
});

app.listen(port, () => console.log(`CacheApp Online on port:${port} with env:${nodeEnv}`));
