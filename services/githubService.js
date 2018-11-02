const axios = require('axios');

const GithubService = {
  getUserDetails: async (username) => {
    return axios.get(`https://api.github.com/users/${username}`);
  }
}

module.exports = GithubService;
