import _ from "lodash";
import fs from "fs";
import path from "path";
import { Iterator } from "@/utils/repos";
import { Report } from "@/utils/report";

const REPORT = Report.init('Typos');

async function analyse(node: Utils.IteratorNode) {
  const hasReadme = fs.existsSync(path.join(node.path, 'README.md'));
  const readme = !hasReadme ? '' : await fs.promises.readFile(path.join(node.path, 'README.md'));

  const hasComposer = fs.existsSync(path.join(node.path, 'composer.json'));
  const composer = !hasComposer ? '' : await fs.promises.readFile(path.join(node.path, 'composer.json'));

  REPORT.add({
    repo: node.repo.full_name,
    'readme(mabar)': readme.includes('mabar') ? '✅' : '❌',
    'composer(mabar)': composer.includes('mabar') ? '✅' : '❌',
    'composer(MPL)': composer.includes('MPL-') ? '✅' : '❌',
    'readme(planette)': readme.includes('planette') ? '✅' : '❌',
  });
}

(async () => {
  const iterator = Iterator.forContributte();
  iterator.fetch(async (node) => {
    await analyse(node);
  });
})();
