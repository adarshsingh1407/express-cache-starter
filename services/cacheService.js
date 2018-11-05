const redis = require('redis');
const {promisify} = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

const setCacheData = ({key, value, command, commandValue}) => {
  return client.set(key, value, command, commandValue);
}

const getCacheData = async (key) => {
  return await getAsync(key);
}

const CacheService = {
  setCacheData,
  getCacheData
};

module.exports = CacheService;
