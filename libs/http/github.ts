import * as httpclient from "./httpclient";

export async function fetchOrganization(org: string): Promise<GithubOrg> {
  const data = await httpclient.get(`/orgs/${org}`);

  return data as GithubOrg;
}

export async function fetchRepositories(org: string): Promise<GithubOrg> {
  const data = await httpclient.get(`/orgs/${org}/repos?per_page=200`);

  return data as GithubOrg;
}

export async function fetchTeam(org: string): Promise<GithubMember[]> {
  const data = await httpclient.get(`/orgs/${org}/members`);

  return data as GithubMember[];
}
