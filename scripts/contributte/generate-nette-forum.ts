import _ from "lodash";
import emoji from "node-emoji";
import CONTRIBUTTE from "@data/github/contributte.json";
import CONTRIBUTTE_TEAM from "@data/contributte/team.json";

function listRepositories(repos: any[]) {
  const data = _(repos)
    .map(repo => {
      return {
        name: repo.full_name,
        link: `https://github.com/${repo.full_name}`,
        description: emoji.emojify(repo.description || ''),
      }
    })
    .value();

  return data;
}

function generatePackages() {
  const contributte = listRepositories(CONTRIBUTTE);

  const compiled = _.template("<% _.forEach(repos, function(repo) { %>| \"<%= repo.name %>\":<%- repo.link %>  | <%- repo.description %> | \n<% }); %>");

  const output = '' +
    "| Package | Popis |\n"
    + "|-----------------------|\n"
    + compiled({ repos: contributte });

  console.log(output);
}

function generateTeam() {
  const compiled = _.template("<% _.forEach(team, function(member) { %> - \"@<%= member.username %>\":https://github.com/<%= member.username %>\n<% }); %>");

  console.log(compiled({ team: CONTRIBUTTE_TEAM }));
}

(async () => {
  if (false) {
    generateTeam();
    generatePackages();
  }
})();
