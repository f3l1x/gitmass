import _ from "lodash";
import { Iterator } from "@libs/utils/repos";
import { Report } from "@libs/utils/report";

const REPORT = Report.init('Composer branch-alias');

function analyse(node: IteratorNode) {
  if (!node.composer) return;

  if (!_.has(node.composer, 'extra.branch-alias')) {
    REPORT.add({
      repo: node.repo.full_name,
      has: '❌'
    });
  } else {
    REPORT.add({
      repo: node.repo.full_name,
      has: '✅',
    });
  }
}

(async () => {
  const iterator = Iterator.forContributte();
  iterator.withComposer();
  iterator.fetch(node => {
    analyse(node);
  });
})();
