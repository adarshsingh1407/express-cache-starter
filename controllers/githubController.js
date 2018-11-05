const GithubService = require('../services/githubService');
const CacheService = require('../services/cacheService');
const SERVER_CONFIG = require('../config/serverConfig');

const getGithub = (req, res) => {
  res.send({
    message: 'Github Route!'
  });
};

const getUserDetailsFromCache = async (req, res, next) => {
  try {
    const username = req.params.username || 'adarshsingh1407';
    const cacheKey = `github:${username}`;
    const cacheData = await CacheService.getCacheData(cacheKey);
    if (cacheData) {
      res.send({
        message: 'FOUND',
        fromCache: true,
        data: JSON.parse(cacheData)
      });
    } else {
      next();
    }
  } catch (e) {
    console.error('Error fetching cache', e);
    next();
  }
}

const getUserDetails = async (req, res) => {
  const username = req.params.username || 'adarshsingh1407';
  const cacheKey = `github:${username}`;
  try {
    const githubUserResponse = await GithubService.getUserDetails(username);
    if (githubUserResponse.status === 200) {
      // Save user details in redis
      CacheService.setCacheData({
        key: cacheKey,
        value: JSON.stringify(githubUserResponse.data),
        ...SERVER_CONFIG.REDIS.CACHE_EXPIRY_OPTIONS
      });
      res.send({
        message: 'FOUND',
        fromCache: false,
        data: githubUserResponse.data
      });
    } else {
      res.send({
        message: 'NOT_FOUND'
      });
    }
  } catch (e) {
    console.log('Unable to fetch user details from Github', username, e);
    res.send({
      message: 'ERROR'
    });
  }
}

const delUserDetailsFromCache = async (req, res) => {
  try {
    const username = req.params.username || 'adarshsingh1407';
    const cacheKey = `github:${username}`;
    const cacheData = await CacheService.delCacheData(cacheKey);
    res.send({
      message: 'DELETED'
    });
  } catch (e) {
    console.error('Error deleting cache', e);
    next();
  }
}

const GithubController = {
  getGithub,
  getUserDetailsFromCache,
  getUserDetails,
  delUserDetailsFromCache
}

module.exports = GithubController;
