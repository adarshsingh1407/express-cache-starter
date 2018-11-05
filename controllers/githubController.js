const GithubService = require('../services/githubService');
const CacheService = require('../services/cacheService');

const getGithub = (req, res) => {
  res.send({
    message: 'Github Route!'
  });
};

const getUserDetailsFromCache = async (req, res, next) => {
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
}

const getUserDetails = async (req, res) => {
  try {
    const username = req.params.username || 'adarshsingh1407';
    const cacheKey = `github:${username}`;
    const githubUserResponse = await GithubService.getUserDetails(username);
    if (githubUserResponse.status === 200) {
      // Save user details in redis
      CacheService.setCacheData({
        key: cacheKey,
        value: JSON.stringify(githubUserResponse.data),
        command: 'EX',
        commandValue: 10
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

const GithubController = {
  getGithub,
  getUserDetailsFromCache,
  getUserDetails
}

module.exports = GithubController;
