const express = require('express');
const github = express.Router();

const GithubController = require('../controllers/githubController');

github.get('/', GithubController.getGithub);

github.get('/:username', GithubController.getUserDetailsFromCache, GithubController.getUserDetails);

github.delete('/:username', GithubController.delUserDetailsFromCache);

module.exports = github;
