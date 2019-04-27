const _ = require('lodash');
const contributteRepos = require('./../data/contributte');
const apitteRepos = require('./../data/apitte');
const nettrineRepos = require('./../data/nettrine');

const repos = {
    contributte: {},
    apitte: {},
    nettrine: {},
};

function generate() {
    generateContributte();
    generateApitte();
    generateNettrine();

    console.log(JSON.stringify(repos['contributte'], null, 2));
    console.log(JSON.stringify(repos['apitte'], null, 2));
    console.log(JSON.stringify(repos['nettrine'], null, 2));
}

function generateContributte() {
    _.forEach(contributteRepos, repo => {
        repos['contributte'][repo.name] = `contributte/${repo.name}`;
    });
}

function generateApitte() {
    _.forEach(apitteRepos, repo => {
        repos['apitte'][repo.name] = `apitte/${repo.name}`;
    });
}

function generateNettrine() {
    _.forEach(nettrineRepos, repo => {
        repos['nettrine'][repo.name] = `nettrine/${repo.name}`;
    });
}

generate();
