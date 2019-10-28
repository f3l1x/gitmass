const _ = require("lodash");
const fs = require('fs');

function prepare() {
  const data = {};
  const orgs = require("./../data/organizations.json");
  _(orgs).forEach((org, name) => {
    data[name] = prepareRepos(name);
  });

  return data;
}

function prepareRepos(org) {
  const data = {};
  const repos = require(`./../data/${org}.json`);
  _(repos)
    .orderBy(["stargazers_count"], ["name"])
    .forEach(repo => {
      data[repo.name] = {
        name: `${org}/${repo.name}`,
        description: repo.description || null,
        stars: repo.stargazers_count
      };
    });

  return data;
}

function repos2table() {
  const orgs = prepare();

  const compiled = _.template(`
        <% _.forEach(repos, function(repo) { %>
        <tr>
            <td>
                <a href="https://github.com/<%- repo.name %>"><%- repo.name %></a>
            </td>
            <td><%- repo.description %></td>
        </tr>
        <% }); %>`);
  const output =
    "" +
    `
<table class="table table-striped table-hovered">
    <tbody>
    ${compiled({ repos: orgs["contributte"] })}
    </tbody>
</table>
`;

  console.log(output);
}

function repos2json() {
  const orgs = prepare();

  _.forEach(orgs, (org, name) => {
    try {
      fs.mkdirSync(`${__dirname}/../data/f3l1x`);
    } catch (e) { }

    const data = _(org)
      .orderBy(['name'], ['asc'])
      .value();

    fs.writeFileSync(`${__dirname}/../data/f3l1x/${name}.json`, JSON.stringify({ repos: data }, null, 2));
  })
}

(async () => {
  // repos2table();
  repos2json();
})();
