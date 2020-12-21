import _ from "lodash";
import { spawnSync } from "child_process";
import { Iterator } from "@libs/utils/repos";

function cloneRepo(node: IteratorNode) {
  console.log(`Clonning [${node.repo.full_name}]: START`);
  const output = spawnSync('git', ['clone', node.repo.clone_url, node.path]);
  console.log(`[${node.repo.full_name}]: ${output.status === 0 ? output.stdout : output.stderr}`);
  console.log(`Clonning [${node.repo.full_name}]: DONE`);
}

function pullRepo(node: IteratorNode) {
  console.log(`Pulling [${node.repo.full_name}]: START`);
  const output = spawnSync('git fetch origin master && git reset --hard origin/master', {
    shell: true,
    cwd: node.path
  });
  console.log(`[${node.repo.full_name}]: ${output.status === 0 ? output.stdout : output.stderr}`);
  console.log(`Pulling [${node.repo.full_name}]: DONE`);
}

(async () => {
  const iterator = Iterator.forContributte();
  iterator.fetch(node => {
    if (node.exists) {
      pullRepo(node);
    } else {
      cloneRepo(node);
    }
  });
})();
