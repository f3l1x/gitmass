import _ from 'lodash';
import repositories from "@data/github/contributte.json";
import { octokit } from "@/http/github";

async function fetchRepoWebhooks(ctx: { org: string, repo: string }): Promise<Vendor.Github.Repository> {
  const res = await octokit.request(`GET /repos/${ctx.org}/${ctx.repo}/hooks`);

  return res;
}

async function deleteRepoGitterWebhook(ctx: { org: string, repo: string, webhook: any }): Promise<any> {
  // Skip non-gitter webhooks
  if (!/https:\/\/webhooks.gitter.im\/e\/[a-zA-Z0-9]+/.test(ctx.webhook.config.url)) return;

  const res = await octokit.request(`DELETE /repos/${ctx.org}/${ctx.repo}/hooks/${ctx.webhook.id}`);
  console.log(`[${ctx.org}/${ctx.repo}]: removed webhook: ${ctx.webhook.config.url}`);

  return res.data;
}

function main(): void {
  _.forEach(repositories, async (repo) => {
    await fetchRepoWebhooks({ org: repo.owner.login, repo: repo.name });
    await deleteRepoGitterWebhook({ org: repo.owner.login, repo: repo.name, webhook: null });
  })
}

// @wanted
(async () => {
  if (false) {
    main();
  }
})();
