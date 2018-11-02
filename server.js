const express = require('express');
const compression = require('compression');
const morgan = require('morgan');

const port = process.env.PORT || 8081;

//Morgan Logging Format
const morganFormat = '(STATUS~:status) ":method :url HTTP/:http-version" (REM_ADDR~:remote-addr) (RES_TIME~:response-time[3]) (REM_USER~:remote-user) (RES_CON_LENGTH~:res[content-length]) (REFERRER~:referrer) (USER_AGENT~:user-agent)';


const app = express();

//Logging
app.use(morgan(morganFormat));

// Compression
app.use(compression({level: 1}))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log(`CacheApp Online on port:${port} with env:${process.env.NODE_ENV}`);
});
