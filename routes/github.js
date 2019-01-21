const express = require('express');
const github = express.Router();

const GithubController = require('../controllers/githubController');

github.get('/', GithubController.getGithub);

github.get('/:username', GithubController.getUserDetailsFromCache, GithubController.getUserDetails);

github.get('/delayed/:username', GithubController.getUserDetailsDelayed);

github.delete('/:username', GithubController.delUserDetailsFromCache);

module.exports = github;
