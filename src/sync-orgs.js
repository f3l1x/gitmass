import _ from "lodash";
import fs from "fs";

import * as httpclient from "./utils/httpclient";
import organizations from "./../data/organizations.json";
import SECRET from "./../secret";

function sync() {
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
  sync();
})();