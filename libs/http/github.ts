import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN_GITMASS, userAgent: 'Gitmass v0.1' });

export async function fetchOrganization(ctx: { org: string }): Promise<GithubOrg> {
  const res = await octokit.request(`GET /orgs/${ctx.org}`);

  return res.data as GithubOrg;
}

export async function fetchRepositories(ctx: { org: string }): Promise<GithubOrg> {
  const res = await octokit.request(`GET /orgs/${ctx.org}/repos?per_page=200&type=public`);

  return res.data as GithubOrg;
}

export async function fetchTeam(ctx: { org: string }): Promise<GithubMember[]> {
  const res = await octokit.request(`GET /orgs/${ctx.org}/members`);

  return res.data as GithubMember[];
}

export async function fetchRepoWebhooks(ctx: { org: string, repo: string }): Promise<GithubRepo> {
  const res = await octokit.request(`GET /repos/${ctx.org}/${ctx.repo}/hooks`);

  return res as GithubRepo;
}

export async function deleteRepoGitterWebhook(ctx: { org: string, repo: string, webhook: any }): Promise<any> {
  // Skip non-gitter webhooks
  if (!/https:\/\/webhooks.gitter.im\/e\/[a-zA-Z0-9]+/.test(ctx.webhook.config.url)) return;

  const res = await octokit.request(`DELETE /repos/${ctx.org}/${ctx.repo}/hooks/${ctx.webhook.id}`);
  console.log(`[${ctx.org}/${ctx.repo}]: removed webhook: ${ctx.webhook.config.url}`);

  return res.data;
}

export async function patchRepository(ctx: { org: string, repo: string, data: any }): Promise<any> {
  const res = await octokit.request(`PATCH /repos/${ctx.org}/${ctx.repo}`, ctx.data);

  return res.data as GithubRepo;
}
