const _ = require('lodash');
const repositories = require('./../data/contributte');

const table = {};

function generateTable() {
    listAllRepositories();

    const compiled = _.template("<% _.forEach(repos, function(repo) { %> | \"<%= repo.name %>\":<%- repo.link %>  | <%- repo.description %> | \n<% }); %>");
    const output = '' +
        "| Package | Popis | \n"
        + " |-----------------------| \n"
        + compiled({repos: table});

    console.log(output);
}

function listAllRepositories() {
    _.forEach(repositories, repo => listRepository(repo));
}

function listRepository(repo) {
    table[repo.name] = {
        name: `contributte/${repo.name}`,
        link: `https://github.com/contributte/${repo.name}`,
        description: repo.description,
    }
}

generateTable();
