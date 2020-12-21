import _ from "lodash";
import fs from "fs";
import path from "path";
import { TMP_DIR } from "@app/config";
import { Iterator } from "@libs/utils/repos";
import { Report } from "@libs/utils/report";

const REPORT = Report.init('Contributte consistency');

const baseEditorconfig = readFile(path.join(TMP_DIR, 'contributte-contributte/std/001-editorconfig/editorconfig'));
const baseGitattributes = readFile(path.join(TMP_DIR, 'contributte-contributte/std/002-gitattributes/gitattributes'));
const baseFunding = readFile(path.join(TMP_DIR, 'contributte-contributte/std/003-funding/FUNDING.yml'));

function analyse(node: IteratorNode) {
  const nodeEditorconfig = readFile(path.join(node.path, '.editorconfig'));
  const nodeGitattributes = readFile(path.join(node.path, '.gitattributes'));
  const nodeFunding = readFile(path.join(node.path, '.github/FUNDING.yml'));

  REPORT.add({
    repo: node.repo.full_name,
    funding: baseFunding.equals(nodeFunding) ? '✅' : '❌',
    editorconfig: baseEditorconfig.equals(nodeEditorconfig) ? '✅' : '❌',
    gitattributes: baseGitattributes.equals(nodeGitattributes) ? '✅' : '❌',
    // makefile: baseEditorconfig.equals(nodeMakefile),
    // ga: baseEditorconfig.equals(nodeMakefile),
  });
}

function readFile(file: string): Buffer {
  try {
    return fs.readFileSync(file);
  } catch (e) {
    return Buffer.alloc(0);
  }
}

(async () => {
  const iterator = Iterator.forContributte();
  iterator.fetch(node => {
    analyse(node);
  });
})();
