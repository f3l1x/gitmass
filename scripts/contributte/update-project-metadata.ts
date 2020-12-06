import _ from 'lodash';
import { patchRepository } from "@libs/http/github";

const orgs = {
  contributte: require('@data/github/contributte'),
  apitte: require('@data/github/apitte'),
  nettrine: require('@data/github/netrixone'),
}

function main(): void {
  _.forEach(orgs, org => {
    _.forEach(org, repo => {
      const data = {
        "name": repo.name,
      };

      decorateProjectHomepage(repo, data);
      decorateProjectButtons(repo, data);

      patchRepository(org, repo, data);
    })
  })
}

function decorateProjectHomepage(repo: string, data: any) {
  data.homepage = `https://contributte.org/packages/${repo}.html`;
}

function decorateProjectButtons(_repo: string, data: any) {
  data.allow_squash_merge = false;
  data.allow_merge_commit = false;
  data.allow_rebase_merge = true;
}

// @wanted
(async () => main())();
