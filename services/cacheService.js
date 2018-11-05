const redis = require('redis');
const {
  promisify
} = require('util');

const client = redis.createClient({
  retry_strategy: function(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      console.error('Redis Server refused connection');
      return new Error('The redis server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      console.error('Redis client: Retry time exhausted');
      return new Error('Redis client: Retry time exhausted');
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      console.error('Redis client: Max retries exhausted');
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
});

client.on('connect', () => console.info('Redis client connect'));
client.on('ready', () => console.log('Redis client ready'));
client.on('reconnect', () => console.log('Redis client reconnect'));
client.on('warning', (warning) => console.warn('Redis client warning ', warning));
client.on('error', (err) => console.error('Redis client error', err));
client.on('end', () => console.info('Redis client connection closed'));

const getAsync = promisify(client.get).bind(client);

const setCacheData = ({
  key,
  value,
  command,
  commandValue
}) => {
  return client.set(key, value, command, commandValue);
}

const getCacheData = async (key) => {
  return await getAsync(key);
}

const delCacheData = (key) => {
  return client.del(key);
}

const CacheService = {
  setCacheData,
  getCacheData,
  delCacheData
};

module.exports = CacheService;
