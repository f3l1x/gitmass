const _ = require("lodash");

const data = {
  contributte: require("./../data/contributte"),
  apitte: require("./../data/apitte"),
  nettrine: require("./../data/nettrine"),
  ninjify: require("./../data/ninjify"),
  planette: require("./../data/planette"),
  dockette: require("./../data/dockette"),
  trainit: require("./../data/trainit"),
};

const repos = {
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
    .orderBy(["stargazers_count"], ["desc"])
    .forEach(repo => {
      repos[id][repo.name] = {
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
    ${compiled({ repos: repos["contributte"] })}
    </tbody>
</table>
`;

  console.log(output);
}

function repos2json() {
  prepare();
  console.log(JSON.stringify({repos: repos.contributte}, null, 2));
  // console.log(JSON.stringify({repos: repos.apitte}, null, 2));
  // console.log(JSON.stringify({repos: repos.nettrine}, null, 2));
  // console.log(JSON.stringify({repos: repos.ninjify}, null, 2));
  // console.log(JSON.stringify({ repos: repos.dockette }, null, 2));
  // console.log(JSON.stringify({ repos: repos.trainit }, null, 2));
  // console.log(JSON.stringify({ repos: repos.planette }, null, 2));
}

repos2json();
