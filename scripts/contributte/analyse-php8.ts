import _ from "lodash";
import semver from "semver";
import { Iterator } from "@libs/utils/repos";
import { Report } from "@libs/utils/report";

const UNDERLAYING_VERSION = '8.0.0';
const REPORT = Report.init('PHP 8 support');

function analyse(node: IteratorNode) {
  if (!node.composer) return;

  const version = _.get(node.composer, 'require.php');
  const versionDev = _.get(node.composer, 'require-dev.php');

  if (!version && !versionDev) {
    REPORT.add({
      repo: node.repo.full_name,
      support: 'ℹ️'
    });
  } else if (semver.satisfies(UNDERLAYING_VERSION, version) || semver.satisfies(UNDERLAYING_VERSION, versionDev)) {
    REPORT.add({
      repo: node.repo.full_name,
      support: '✅'
    });
  } else {
    REPORT.add({
      repo: node.repo.full_name,
      support: '❌',
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
