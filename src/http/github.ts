import { Octokit } from "@octokit/rest";

if (!process.env.GITHUB_TOKEN_GITMASS) {
  console.error('Missing GITHUB_TOKEN_GITMASS');
  process.exit(255);
}

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN_GITMASS, userAgent: 'Gitmass v0.1' });
