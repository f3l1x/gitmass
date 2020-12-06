import _ from "lodash";
import fs from "fs";
import path from "path";
import { Iterator } from "@libs/utils/repos";
import { DATA_DIR } from "@app/config";
import { octokit } from "@libs/http/github";
import chalk from "chalk";

async function update(node: IteratorNode) {
  const editorconfig = fs.readFileSync(path.join(DATA_DIR, 'std/001-editorconfig/editorconfig'));

  const branch = 'feature-std-editorconfig';
  const branchRef = `refs/heads/${branch}`;

  // const resRef1 = await octokit.git.getRef({
  //   owner: node.repo.owner.login,
  //   repo: node.repo.name,
  //   ref: 'heads/master'
  // });

  // if (resRef1.status !== 200) throw `Cannot get ref for heads/master`;

  // const resRef2 = await octokit.git.createRef({
  //   owner: node.repo.owner.login,
  //   repo: node.repo.name,
  //   ref: branchRef,
  //   sha: resRef1.data.object.sha,
  // });

  // if (resRef2.status !== 201) throw `Cannot create ref for ${branchRef}`;

  // const resCurrFile = await octokit.repos.getContent({
  //   owner: node.repo.owner.login,
  //   repo: node.repo.name,
  //   branch: branchRef,
  //   path: '.editorconfig',
  // });

  // if (resCurrFile.status !== 200) throw `Cannot get current content of .editorconfig`;
  // if (Array.isArray(resCurrFile.data)) throw `Invalid content data for .editorconfig`;

  // const resNewFile = await octokit.repos.createOrUpdateFileContents({
  //   owner: node.repo.owner.login,
  //   repo: node.repo.name,
  //   branch: branchRef,
  //   path: '.editorconfig',
  //   content: editorconfig.toString('base64'),
  //   message: 'Std: editorconfig',
  //   sha: resCurrFile.data.sha,
  // });

  // if (resNewFile.status !== 200) throw `Cannot update file .editorconfig`;

  const resPull = await octokit.pulls.create({
    owner: node.repo.owner.login,
    repo: node.repo.name,
    head: branch,
    base: 'master'
  });

  if (resPull.status !== 201) throw `Cannot create PR`;

  process.exit(1);
}

(async () => {
  const iterator = Iterator.forContributte();
  iterator.fetch(async (node) => {
    try {
      await update(node);
      console.log(chalk.green(`File .editorconfig sync with ${node.repo.full_name}`));
    } catch (e) {
      console.log(chalk.red(`File .editorconfig sync failed with ${node.repo.full_name}`));
      console.log(e);
    }

    process.exit(1);
  });
})();
