import _ from "lodash";
import fs from "fs";

import { ORGANIZATIONS, TMP_DIR } from "./../../config";

export function iterRepo(options, callback) {
    _.forEach(ORGANIZATIONS, load => {
        let repos = _(load());

        if (options.filter) {
            repos = repos.filter(options.filter);
        } else {
            repos = repos.filter(r => !r.archived);
        }

        repos.forEach(repo => callback(repo));
    });
}

export function iterFileRepo(options, foundCb, notFoundCb) {
    iterRepo(options, repo => {
        const repoKey = `${repo.owner.login}-${repo.name}`;
        const repoPath = `${TMP_DIR}/${repoKey}`;

        if (fs.existsSync(repoPath)) {
            foundCb(repo, repoPath);
        } else {
            notFoundCb(repo, repoPath);
        }
    });
}
