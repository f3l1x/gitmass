import _ from "lodash";
import fs from "fs";
import { fetchTeam } from "@libs/http/github";

async function dump() {
  const githubTeam = await fetchTeam({ org: 'contributte' });
  const team = githubTeam.map(member => {
    return {
      username: member.login,
      avatar: member.avatar_url,
    }
  });

  fs.writeFileSync(__dirname + `/../../data/contributte/team.json`, JSON.stringify(team, null, 2));
}

(async () => {
  await dump();
})();
