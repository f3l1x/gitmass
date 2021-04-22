import _ from "lodash";
import fs from "fs";
import { ORGANIZATIONS, GITHUB_DIR } from "@/config";
import { octokit } from "@/http/github";

async function dump(): Promise<void> {
  const data: Structure = {};
  const orgs = Object.keys(ORGANIZATIONS);

  for (const org of orgs) {
    try {
      const resOrg = await octokit.orgs.get({ org });

      data[resOrg.data.login] = {
        name: resOrg.data.name,
        webalize: resOrg.data.login,
        description: resOrg.data.description,
        id: resOrg.data.id,
      }
    } catch (e) {
      console.log(e);
    }
  }

  fs.writeFileSync(`${GITHUB_DIR}/organizations.json`, JSON.stringify(data, null, 2));
}

// @wanted
(async () => await dump())();
