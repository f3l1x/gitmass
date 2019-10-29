import _ from "lodash";
import fs from "fs";

import * as httpclient from "./utils/httpclient";
import SECRET from "./../secret";

async function dump() {
    let data = {};
    try {
        const response = await httpclient.get(`/orgs/contributte/members?&access_token=${SECRET.TOKEN}`);
        data = response.map(member => {
            return {
                username: member.login,
                avatar: member.avatar_url,
            }
        });
    } catch (e) {
        console.log(e);
    }

    fs.writeFileSync(__dirname + `/../data/contributte/team.json`, JSON.stringify(data, null, 2));
}

(async () => {
    await dump();
})();