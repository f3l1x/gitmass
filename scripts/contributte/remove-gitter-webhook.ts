import _ from 'lodash';
import repositories from "@data/github/contributte.json";
import { fetchRepoWebhooks, deleteRepoGitterWebhook } from "@libs/http/github";

function main(): void {
  _.forEach(repositories, async (repo) => {
    await fetchRepoWebhooks({ org: repo.owner.login, repo: repo.name });
    await deleteRepoGitterWebhook({ org: repo.owner.login, repo: repo.name, webhook: null });
  })
}

// @wanted
(async () => main())();
