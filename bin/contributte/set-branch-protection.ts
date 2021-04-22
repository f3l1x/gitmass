import chalk from "chalk";
import { Iterator } from "@/utils/repos";
import { octokit } from "@/http/github";

const DEFAULT_BRANCH = 'master';

async function update(node: Utils.IteratorNode) {
  const resUpdatedProtection = await octokit.repos.updateBranchProtection({
    owner: node.repo.owner.login,
    repo: node.repo.name,
    branch: DEFAULT_BRANCH,
    required_status_checks: null,
    enforce_admins: null,
    required_pull_request_reviews: null,
    restrictions: null,
    allow_force_pushes: true,
    allow_deletions: false,
  });

  if (resUpdatedProtection.status !== 200) throw `Cannot update branch protection`;
}

(async () => {
  const iterator = Iterator.forContributte();
  iterator.fetch(async (node) => {
    try {
      await update(node);
      console.log(chalk.green(`Branch protection updated ${node.repo.full_name}`));
    } catch (e) {
      console.log(chalk.red(`Branch protection update failed ${node.repo.full_name}`));
      console.log(e);
    }
  });
})();
