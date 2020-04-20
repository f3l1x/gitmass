import _ from "lodash";
import fs from "fs";
import { ORGANIZATIONS, TMP_DIR } from "@app/config";

export function iterRepo(options: Partial<ReposIteratorOptions>, callback: DataOrgCb) {
  _.forEach(ORGANIZATIONS, (load: () => any[]) => {
    let repos = _(load() as DataRepo[]);

    if (options.filter) {
      repos = repos.filter(options.filter);
    } else {
      repos = repos.filter(r => !r.archived);
    }

    repos.forEach(repo => callback(repo));
  });
}

export function iterFileRepo(options: Partial<ReposIteratorOptions>, foundCb: DataOrgWithPathCb, notFoundCb: DataOrgWithPathCb) {
  iterRepo(options, (repo: DataRepo) => {
    const repoKey = `${repo.owner.login}-${repo.name}`;
    const repoPath = `${TMP_DIR}/${repoKey}`;

    if (fs.existsSync(repoPath)) {
      foundCb(repo, repoPath);
    } else {
      notFoundCb(repo, repoPath);
    }
  });
}
