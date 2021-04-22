import { Iterator } from "@/utils/repos";
import { octokit } from "@/http/github";
import chalk from "chalk";

async function update(node: Utils.IteratorNode) {
  await octokit.repos.update({
    owner: node.repo.owner.login,
    repo: node.repo.name,
    allow_squash_merge: true,
    allow_rebase_merge: true,
    allow_merge_commit: false,
  })
}

(async () => {
  const iterator = Iterator.forMainstream();
  iterator.fetch(async (node) => {
    try {
      await update(node);
      console.log(chalk.green(`Merge buttons updated ${node.repo.full_name}`));
    } catch (e) {
      console.log(chalk.red(`Merge buttons update failed ${node.repo.full_name}`));
      console.log(e);
    }
  });
})();
