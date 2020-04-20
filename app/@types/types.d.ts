interface Structure {
  [key: string]: any
}

interface DataOrg {
  name: string,
  webalize: string,
  description: string,
  id: number,
}

interface DataRepo {
  archived: boolean,
  full_name: string,
  clone_url: string,
  name: string,
  owner: {
    login: string,
  }
}

interface ReposIteratorOptions {
  filter: { [key: string]: any }
}

interface GithubOrg {
  name: string,
  description: string,
  id: number,
  login: string,
}

interface GithubMember {
  login: string,
  avatar_url: string,
}

type DataOrgCb = { (repo: DataRepo): void };

type DataOrgWithPathCb = { (repo: DataRepo, path: string): void };
