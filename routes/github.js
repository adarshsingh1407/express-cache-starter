const express = require('express');
const github = express.Router();
const axios = require('axios');

const getGithubUserDetails = async (username) => {
  return axios.get(`https://api.github.com/users/${username}`);
}

github.get('/', async (req, res) => {
  res.send({
    message: 'Github Route!'
  });
});

github.get('/:username', async (req, res) => {
  const username = req.params.username || 'adarshsingh1407';
  try {
    const githubUserResponse = await getGithubUserDetails(username);
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
});

module.exports = github;
