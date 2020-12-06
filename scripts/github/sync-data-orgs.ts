import _ from "lodash";
import fs from "fs";
import { ORGANIZATIONS, GITHUB_DIR } from "@app/config";
import { fetchOrganization } from "@libs/http/github";

async function main(): Promise<void> {
  const data: Structure = {};
  const orgs = Object.keys(ORGANIZATIONS);

  for (const org of orgs) {
    try {
      const githubOrg = await fetchOrganization({ org });

      data[githubOrg.login] = {
        name: githubOrg.name,
        webalize: githubOrg.login,
        description: githubOrg.description,
        id: githubOrg.id,
      }
    } catch (e) {
      console.log(e);
    }
  }

  fs.writeFileSync(`${GITHUB_DIR}/organizations.json`, JSON.stringify(data, null, 2));
}

// @wanted
(async () => main())();
