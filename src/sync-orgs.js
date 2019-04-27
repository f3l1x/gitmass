import _ from "lodash";

import * as httpclient from "./utils/httpclient";
import organizations from "./../data/organizations.json";
import CONFIG from "./../config";

function sync() {
  _.forEach(organizations, async ({ name }) => {
    const response = await httpclient.get(`/orgs/${name}/repos?per_page=200&access_token=${CONFIG.TOKEN}`);
    fs.writeFileSync(__dirname + `/../data/${name}.json`, JSON.stringify(response, null, 2));
  });
}

sync();
