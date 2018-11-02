const GithubService = require('../services/githubService');

const getGithub = (req, res) => {
  res.send({
    message: 'Github Route!'
  });
};

const getUserDetails = async (req, res) => {
  const username = req.params.username || 'adarshsingh1407';
  try {
    const githubUserResponse = await GithubService.getUserDetails(username);
    if (githubUserResponse.status === 200) {
      res.send({
        message: 'FOUND',
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
  getUserDetails
}

module.exports = GithubController;
