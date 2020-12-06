import _ from "lodash";
import fs from "fs";
import path from "path";
import { Iterator } from "@libs/utils/repos";
import { Report } from "@libs/utils/report";

const REPORT = Report.init('Contributte .docs folder');

function analyse(node: IteratorNode) {
  if (!fs.existsSync(path.join(node.path, '.docs'))) {
    REPORT.add({
      repo: node.repo.full_name,
      has: '❌',
    });
  } else {
    REPORT.add({
      repo: node.repo.full_name,
      has: '✅'
    });
  }
}

(async () => {
  const iterator = Iterator.forContributte();
  iterator.fetch(node => {
    analyse(node);
  });
})();
