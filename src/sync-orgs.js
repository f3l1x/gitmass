import _ from "lodash";
import fs from "fs";

import * as httpclient from "./utils/httpclient";
import organizations from "./../data/organizations.json";
import SECRET from "./../secret";

async function syncOrgs() {
  const data = {};

 for (const org of organizations) {
    try {
      const response = await httpclient.get(`/orgs/${org.name}?&access_token=${SECRET.TOKEN}`);
      data[org.name] = {
        name: response.name,
        webalize: org.name,
        description: response.description,
        id: response.id,
      }
    } catch (e) {
      console.log(e);
    }
  }

  fs.writeFileSync(__dirname + `/../data/organizations.json`, JSON.stringify(data, null, 2));
}
function syncRepos() {
  _.forEach(organizations, async ({ name }) => {
    try {
      const response = await httpclient.get(`/orgs/${name}/repos?per_page=200&access_token=${SECRET.TOKEN}`);
      fs.writeFileSync(__dirname + `/../data/${name}.json`, JSON.stringify(response, null, 2));
    } catch (e) {
      console.log(e);
    }
  });
}

(async () => {
  // await syncOrgs();
  syncRepos();
})();