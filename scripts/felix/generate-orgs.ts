import _ from "lodash";
import fs from "fs";
import { GITHUB_DIR } from "@app/config";

(async () => {
  const data = _(require(`${GITHUB_DIR}/organizations.json`))
    .map(org => {
      return {
        id: org.id,
        name: org.name,
        webalize: org.webalize,
        description: org.description,
      }
    })
    .value();

  // Ensure we have a proper folder
  try {
    fs.mkdirSync(`${__dirname}/../../data/f3l1x`);
  } catch (e) { }

  fs.writeFileSync(`${__dirname}/../../data/f3l1x/organizations.json`, JSON.stringify(data, null, 2));
})();

