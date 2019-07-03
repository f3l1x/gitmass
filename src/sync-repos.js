import _ from "lodash";
import { spawnSync } from "child_process";

import { iterFileRepo } from "./utils/repos";
import { TMP_DIR } from "./../config";

function cloneRepo(repo) {
    console.log(`Clonning [${repo.full_name}]: START`);
    const output = spawnSync('git', ['clone', repo.clone_url, `${repo.owner.login}-${repo.name}`], { cwd: `${TMP_DIR}` });
    console.log(`[${repo.full_name}]: ${output.status === 0 ? output.stdout : output.stderr}`);
    console.log(`Clonning [${repo.full_name}]: DONE`);
}

function pullRepo(repo) {
    console.log(`Pulling [${repo.full_name}]: START`);
    const output = spawnSync('git fetch origin master && git reset --hard origin/master', {
        shell: true,
        cwd: `${TMP_DIR}/${repo.owner.login}-${repo.name}`
    });
    console.log(`[${repo.full_name}]: ${output.status === 0 ? output.stdout : output.stderr}`);
    console.log(`Pulling [${repo.full_name}]: DONE`);
}

(async () => {
    iterFileRepo(
        {},
        pullRepo,
        cloneRepo
    );
})();