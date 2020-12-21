import _ from 'lodash';
import fs from 'fs';
import organizations from "@data/github/organizations.json";

function main(): void {
  _.forEach(organizations, org => sortOrg(org.name));
}

function sortOrg(org: string): void {
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

// @wanted
(async () => main())();
