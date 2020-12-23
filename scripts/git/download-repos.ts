import _ from "lodash";
import { spawn } from "child_process";
import { Iterator } from "@libs/utils/repos";

async function cloneRepo(node: IteratorNode): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Clonning [${node.repo.full_name}]: START`);
    const child = spawn('git', ['clone', node.repo.clone_url, node.path]);
    child.on('message', (message) => {
      console.log(`[${node.repo.full_name}]: ${message}`);
    });
    child.on('error', (message) => {
      console.error(`[${node.repo.full_name}]: ${message}`);
    });
    child.stdout.on('data', (data) => {
      console.log(`[${node.repo.full_name}]: ${data}`);
    });
    child.stderr.on('data', (data) => {
      console.error(`[${node.repo.full_name}]: ${data}`);
    });
    child.on('close', (code) => {
      console.log(`Clonning [${node.repo.full_name}]: ${code === 0 ? 'DONE' : 'ERRORED'}`);
      resolve();
    });
    child.on('exit', () => {
      console.error(`Clonning [${node.repo.full_name}]: FAILED`);
      reject();
    });
  })
}

async function pullRepo(node: IteratorNode): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Pulling [${node.repo.full_name}]: START`);
    const child = spawn('git fetch origin master && git reset --hard origin/master', {
      shell: true,
      cwd: node.path
    });
    child.on('message', (message) => {
      console.log(`[${node.repo.full_name}]: ${message}`);
    });
    child.on('error', (message) => {
      console.error(`[${node.repo.full_name}]: ${message}`);
    });
    child.stdout.on('data', (data) => {
      console.log(`[${node.repo.full_name}]: ${data}`);
    });
    child.stderr.on('data', (data) => {
      console.error(`[${node.repo.full_name}]: ${data}`);
    });
    child.on('exit', (code) => {
      console.log(`Pulling [${node.repo.full_name}]: ${code === 0 ? 'DONE' : 'ERRORED'}`);
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

(async () => {
  const iterator = Iterator.forAll();
  iterator.fetch(async (node) => {
    try {
      if (node.exists) {
        await pullRepo(node);
      } else {
        await cloneRepo(node);
      }
    } catch (e) {
      console.error(`Downloading [${node.repo.full_name}]: FAILED`, e);
    }
  });
})();
