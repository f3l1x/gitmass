import _ from "lodash";
import fs from "fs";
import { GITHUB_DIR, DATA_DIR } from "@/config";

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
    await fs.promises.mkdir(`${DATA_DIR}/f3l1x`);
  } catch (e) { }

  await fs.promises.writeFile(`${DATA_DIR}/f3l1x/organizations.json`, JSON.stringify(data, null, 2));
})();

