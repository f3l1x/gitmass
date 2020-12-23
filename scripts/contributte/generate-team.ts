import _ from "lodash";
import fs from "fs";
import { octokit } from "@libs/http/github";
import path from "path";
import { DATA_DIR } from "@app/config";

async function dump() {
  const resMembers = await octokit.orgs.listMembers({
    org: 'contributte',
  });

  const team = resMembers.data.map(member => {
    return {
      username: member?.login,
      avatar: member?.avatar_url,
    }
  });

  fs.writeFileSync(path.join(DATA_DIR, 'contributte/team.json'), JSON.stringify(team, null, 2));
}

(async () => {
  await dump();
})();
