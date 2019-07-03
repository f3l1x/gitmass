const _ = require('lodash');
const emoji = require('node-emoji');

const repositories = require('./../data/contributte.json');

function generateTable() {
    const repos = listRepositories();

    const compiled = _.template("<% _.forEach(repos, function(repo) { %>| \"<%= repo.name %>\":<%- repo.link %>  | <%- repo.description %> | \n<% }); %>");
    const output = '' +
        "| Package | Popis |\n"
        + "|-----------------------|\n"
        + compiled({ repos });

    console.log(output);
}

function listRepositories() {
    const repos = {};

    _.forEach(repositories, repo => {
        repos[repo.name] = {
            name: `contributte/${repo.name}`,
            link: `https://github.com/contributte/${repo.name}`,
            description: emoji.emojify(repo.description),
        }
    });

    return repos;
}

(async () => {
    generateTable();
})();
