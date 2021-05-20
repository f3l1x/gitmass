import chalk from "chalk";
import { Iterator } from "@/utils/repos";
import { octokit } from "@/http/github";

async function update(node: Utils.IteratorNode): Promise<boolean> {
  const res = await octokit.actions.listWorkflowRunsForRepo({
    owner: node.repo.owner.login,
    repo: node.repo.name,
  });

  if (res.status !== 200) throw `Cannot get workflows`;

  if (res.data.workflow_runs.length <= 0) throw `No workflow`;

  const workflow = res.data.workflow_runs[0];

  if (workflow.conclusion === 'failure') {
    return false;
  }

  if (workflow.conclusion === 'success') {
    return true;
  }

  throw `Invalid workflow state`;
}

(async () => {
  const iterator = Iterator.forContributte();
  iterator.fetch(async (node) => {
    try {
      const res = await update(node);
      if (res) {
        console.log(chalk.green(`Workflow OK ${node.repo.full_name}`));
      } else {
        console.log(chalk.yellow(`Worflow FAILED ${node.repo.full_name}`));
      }
    } catch (e) {
      console.log(chalk.red(`Workflow detection failed ${node.repo.full_name}`), e);
    }
  });
})();
