import _ from "lodash";
import { Iterator } from "@/utils/repos";
import { Report } from "@/utils/report";

const REPORT = Report.init('PHP testing (nette/tester vs phpunit)');

function analyse(node: Utils.IteratorNode) {
  if (!node.composer) return;

  const netteTester = _.get(node.composer, 'require-dev.nette/tester');
  const nunjuck = _.get(node.composer, 'require-dev.ninjify/nunjuck');
  const phpunit = _.get(node.composer, 'require-dev.phpunit/phpunit');

  REPORT.add({
    repo: node.repo.full_name,
    'nette/tester': netteTester ? '✅' : '❌',
    'ninjify/nunjuck': nunjuck ? '✅' : '❌',
    'phpunit': phpunit ? '✅' : '❌'
  });
}

(async () => {
  const iterator = Iterator.forContributte();
  iterator.withComposer();
  iterator.fetch(async (node) => {
    analyse(node);
  });
})();
