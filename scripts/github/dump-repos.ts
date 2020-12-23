import _ from "lodash";
import { DATA_DIR } from "@app/config";
import { octokit } from "@libs/http/github";
import fs from "fs";
import organizations from "@data/github/organizations.json";
import path from "path";

async function dump() {
  _.forEach(Object.values(organizations) as DataOrg[], async (org: DataOrg) => {
    try {
      const resRepos = await octokit.request(`GET /orgs/${org.webalize}/repos?per_page=200&type=public`);
      fs.writeFileSync(path.join(DATA_DIR, `github/${org.webalize}.json`), JSON.stringify(resRepos.data, null, 2));
    } catch (e) {
      console.log(e);
    }
  });
}

(async () => await dump())();
