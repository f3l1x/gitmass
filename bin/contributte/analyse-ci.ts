import _ from "lodash";
import fs from "fs";
import path from "path";
import { Iterator } from "@/utils/repos";
import { Report } from "@/utils/report";

const REPORT = Report.init('Travis -> Github Actions');

function analyse(node: Utils.IteratorNode) {
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
  iterator.fetch(async (node) => {
    analyse(node);
  });
})();
