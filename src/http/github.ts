import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN_GITMASS, userAgent: 'Gitmass v0.1' });
