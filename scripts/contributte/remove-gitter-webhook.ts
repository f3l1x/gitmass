import _ from 'lodash';
import repositories from "@data/github/contributte.json";

function main(): void {
  _.forEach(repositories, async (_repo) => {
    // await fetchRepoWebhooks({ org: repo.owner.login, repo: repo.name });
    // await deleteRepoGitterWebhook({ org: repo.owner.login, repo: repo.name, webhook: null });
  })
}

// @wanted
(async () => main())();
