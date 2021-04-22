import _ from "lodash";
import { Iterator } from "@/utils/repos";
import { octokit } from "@/http/github";
import chalk from "chalk";

const WORKFLOW = "004-kodiak.yaml";
const BASE_OWNER = 'contributte';
const BASE_REPO = 'contributte';

async function update(node: Utils.IteratorNode, workflow: string) {
  const resRef = await octokit.git.getRef({
    owner: BASE_OWNER,
    repo: BASE_REPO,
    ref: 'heads/master'
  });

  if (resRef.status !== 200) throw `Cannot get ref for heads/master`;

  const resWorkflow = await octokit.actions.createWorkflowDispatch({
    owner: BASE_OWNER,
    repo: BASE_REPO,
    ref: resRef.data.ref,
    workflow_id: workflow,
    inputs: {
      repository: `${node.repo.owner.login}/${node.repo.name}`
    }
  });

  if (resWorkflow.status !== 204) throw `Cannot trigger workflow ${workflow}`;
}

(async () => {
  const iterator = Iterator.forApitteOnly();
  iterator.fetch(async (node) => {
    try {
      await update(node, WORKFLOW);
      console.log(chalk.green(`Workflow triggered for ${node.repo.full_name}`));
    } catch (e) {
      console.log(chalk.red(`Workflow trigger failed for ${node.repo.full_name}`));
      console.log(e);
    }
  });
})();
