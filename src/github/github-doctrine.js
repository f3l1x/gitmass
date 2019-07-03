const doctrine = require('./../../data/doctrine.json');

const repos = [];

doctrine.forEach(repo => {
    if (repo.stargazers_count < 50) return
    repos.push(repo.name);
    console.log(1 + ' ' + repo.name);
});

// console.log(JSON.stringify(repos));
