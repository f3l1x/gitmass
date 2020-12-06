import _ from 'lodash';
import repositories from "@data/github/contributte.json";
import { fetchRepoWebhooks, deleteRepoGitterWebhook } from "@libs/http/github";

function main(): void {
  _.forEach(repositories, async (repo) => {
    const res1 = await fetchRepoWebhooks(repo.full_name);
    const res2 = await deleteRepoGitterWebhook(repo.full_name, {});
  })
}

// @wanted
(async () => main())();
