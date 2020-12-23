import _ from "lodash";
import fs from "fs";
import { ORGANIZATIONS, GITHUB_DIR } from "@app/config";
import { octokit } from "@libs/http/github";

async function dump(): Promise<void> {
  const data: Structure = {};
  const orgs = Object.keys(ORGANIZATIONS);

  for (const org of orgs) {
    try {
      const githubOrg = await octokit.orgs.get({ org });

      data[githubOrg.data.login] = {
        name: githubOrg.data.name,
        webalize: githubOrg.data.login,
        description: githubOrg.data.description,
        id: githubOrg.data.id,
      }
    } catch (e) {
      console.log(e);
    }
  }

  fs.writeFileSync(`${GITHUB_DIR}/organizations.json`, JSON.stringify(data, null, 2));
}

// @wanted
(async () => dump())();
