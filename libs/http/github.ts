import * as httpclient from "./httpclient";

export async function fetchOrganization(org: string): Promise<GithubOrg> {
  const res = await httpclient.get(`/orgs/${org}`);

  return res as GithubOrg;
}

export async function fetchRepositories(org: string): Promise<GithubOrg> {
  const res = await httpclient.get(`/orgs/${org}/repos?per_page=200&type=public`);

  return res as GithubOrg;
}

export async function fetchTeam(org: string): Promise<GithubMember[]> {
  const res = await httpclient.get(`/orgs/${org}/members`);

  return res as GithubMember[];
}

export async function fetchRepoWebhooks(org: string, repo: string): Promise<GithubRepo> {
  const res = await httpclient.get(`/repos/${org}/${repo}/hooks`);

  return res as GithubRepo;
}

export async function deleteRepoGitterWebhook(org: string, repo: string, webhook: any): Promise<void> {
  // Skip non-gitter webhooks
  if (!/https:\/\/webhooks.gitter.im\/e\/[a-zA-Z0-9]+/.test(webhook.config.url)) return;

  const res = await httpclient.delete(`/repos/${org}/${repo}/hooks/${webhook.id}`);
  console.log(`[${org}/${repo}]: removed webhook: ${webhook.config.url}`);
}

export async function patchRepository(org: string, repo: string, data: any) {
  const res = await httpclient.patch(`/repos/${org}/${repo}`, data);

  return res as GithubRepo;
}
