import _ from "lodash";
import fs from "fs";
import path from "path";
import { Iterator } from "@libs/utils/repos";
import { Report } from "@libs/utils/report";

const REPORT = Report.init('Travis -> Github Actions');

function analyse(node: IteratorNode) {
  const ga = fs.existsSync(path.join(node.path, '.github/workflows/main.yaml'));
  const travis = fs.existsSync(path.join(node.path, '.travis.yml'));

  REPORT.add({
    repo: node.repo.full_name,
    ga: ga ? '✅' : '❌',
    travis: travis ? '✅' : '❌'
  });
}

(async () => {
  const iterator = Iterator.forContributte();
  iterator.fetch(node => {
    analyse(node);
  });
})();
