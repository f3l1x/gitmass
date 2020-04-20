import _ from "lodash";
import fs from "fs";
import organizations from "@data/github/organizations.json";
import { fetchRepositories } from "@libs/http/github";

function main() {
  _.forEach(Object.values(organizations) as DataOrg[], async (org: DataOrg) => {
    try {
      const response = await fetchRepositories(org.webalize);
      fs.writeFileSync(__dirname + `/../../data/github/${org.webalize}.json`, JSON.stringify(response, null, 2));
    } catch (e) {
      console.log(e);
    }
  });
}

// @wanted
(async () => main())();
