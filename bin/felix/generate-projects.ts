import _ from "lodash";
import fs from "fs";
import { ORGANIZATIONS, DATA_DIR } from "@/config";

const SKIPPED = ['nette'];

(async () => {
  const data = _(Object.keys(ORGANIZATIONS))
    .filter(org => !SKIPPED.includes(org))
    .map(org => {
      return require(`${DATA_DIR}/github/${org}.json`);
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

  // Ensure we have a proper folder
  try {
    await fs.promises.mkdir(`${DATA_DIR}/f3l1x`);
  } catch (e) { }

  await fs.promises.writeFile(`${DATA_DIR}/f3l1x/projects.json`, JSON.stringify(data, null, 2));
})();
