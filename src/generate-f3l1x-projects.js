const _ = require("lodash");
const fs = require('fs');

const data = {
  contributte: require("./../data/contributte"),
  apitte: require("./../data/apitte"),
  nettrine: require("./../data/nettrine"),
  ninjify: require("./../data/ninjify"),
  planette: require("./../data/planette"),
  dockette: require("./../data/dockette"),
  trainit: require("./../data/trainit"),
};

const orgs = {
  contributte: {},
  apitte: {},
  nettrine: {},
  ninjify: {},
  planette: {},
  dockette: {},
  trainit: {}
};

function prepare() {
  prepareRepos("contributte");
  prepareRepos("apitte");
  prepareRepos("nettrine");
  prepareRepos("ninjify");
  prepareRepos("planette");
  prepareRepos("dockette");
  prepareRepos("trainit");
}

function prepareRepos(id) {
  _(data[id])
    .orderBy(["stargazers_count"], ["name"])
    .forEach(repo => {
      orgs[id][repo.name] = {
        name: `${id}/${repo.name}`,
        description: `${repo.description}`
      };
    });
}

function repos2table() {
  prepare();

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
  prepare();

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
  repos2json();
})();
