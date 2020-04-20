import _ from "lodash";
import fs from "fs";
import { ORGANIZATIONS } from "@app/config";

const SKIPPED = ['nette'];

function prepare() {
  const data = _(Object.keys(ORGANIZATIONS))
    .filter(org => !SKIPPED.includes(org))
    .map(org => {
      return require(`./../../data/github/${org}.json`);
    })
    .flatMap()
    .map(repo => {
      return {
        org: repo.owner.login,
        name: repo.name,
        description: repo.description || null,
        stars: repo.stargazers_count
      }
    })
    .orderBy(['stars'], ['desc'])
    .value();

  return data;
}

function repos2json() {
  const repos = prepare();

  // Ensure we have a proper folder
  try {
    fs.mkdirSync(`${__dirname}/../../data/f3l1x`);
  } catch (e) { }

  fs.writeFileSync(`${__dirname}/../../data/f3l1x/projects.json`, JSON.stringify({ repos }, null, 2));
}

(async () => {
  repos2json();
})();
