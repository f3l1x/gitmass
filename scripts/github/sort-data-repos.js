const _ = require('lodash');
const fs = require('fs');

import organizations from "./../data/organizations.json";

function sort() {
  _.forEach(organizations, org => sortOrg(org.name));
}

function sortOrg(org) {
  const repos = JSON.parse(fs.readFileSync(`${__dirname}/../data/${org}.json`, { encoding: "UTF-8" }));

  const data = _(repos)
    .orderBy(['stargazers_count', 'name'], ['desc', 'asc'])
    .keyBy('name')
    .value();

  fs.writeFileSync(
    `${__dirname}/../data/${org}.json`,
    JSON.stringify(data, null, 2)
  );
}

(async () => {
  sort();
})();
