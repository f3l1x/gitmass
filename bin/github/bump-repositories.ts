import _ from "lodash";
import fs from "fs";
import path from "path";
import { DATA_DIR } from "@/config";
import { octokit } from "@/http/github";
import organizations from "@data/github/organizations.json";

async function dump() {
  _.forEach(Object.values(organizations) as Data.Organization[], async (org) => {
    try {
      const resRepos = await octokit.request(`GET /orgs/${org.webalize}/repos?per_page=200&type=public`);
      fs.writeFileSync(path.join(DATA_DIR, `github/${org.webalize}.json`), JSON.stringify(resRepos.data, null, 2));
    } catch (e) {
      console.log(e);
    }
  });
}

(async () => await dump())();
