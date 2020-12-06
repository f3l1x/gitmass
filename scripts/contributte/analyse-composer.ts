import _ from "lodash";
import { Iterator } from "@libs/utils/repos";
import { Report } from "@libs/utils/report";

const REPORT = Report.init('Composer standardization');

function analyse(node: IteratorNode) {
  if (!node.composer) return;

  const description = _.has(node.composer, 'description');
  const keywords = _.has(node.composer, 'keywords');
  const type = _.has(node.composer, 'keywords');
  const license = _.has(node.composer, 'license');
  const homepage = _.has(node.composer, 'authors');
  const authors = _.has(node.composer, 'authors');
  const suggest = _.has(node.composer, 'suggest');
  const require = _.has(node.composer, 'require');
  const requireDev = _.has(node.composer, 'require-dev');
  const conflict = _.has(node.composer, 'conflict');
  const scripts = _.has(node.composer, 'scripts');
  const branchAlias = _.has(node.composer, 'extra.branch-alias');
  const bin = _.has(node.composer, 'bin');
  const autoload = _.has(node.composer, 'autoload');
  const autoloadDev = _.has(node.composer, 'autoload-dev');
  const sortPackages = _.has(node.composer, 'config.sort-packages');
  const minimumStability = _.has(node.composer, 'minimum-stability');
  const preferStable = _.has(node.composer, 'prefer-stable');

  REPORT.add({
    repo: node.repo.full_name,
    description: description ? '✅' : '❌',
    keywords: keywords ? '✅' : '❌',
    type: type ? '✅' : '❌',
    license: license ? '✅' : '❌',
    homepage: homepage ? '✅' : '❌',
    authors: authors ? '✅' : '❌',
    suggest: suggest ? '✅' : '❌',
    require: require ? '✅' : '❌',
    requireDev: requireDev ? '✅' : '❌',
    autoload: autoload ? '✅' : '❌',
    autoloadDev: autoloadDev ? '✅' : '❌',
    conflict: conflict ? '✅' : '❌',
    scripts: scripts ? '✅' : '❌',
    'minimum-stability': minimumStability ? '✅' : '❌',
    'prefer-stable': preferStable ? '✅' : '❌',
    'branch-alias': branchAlias ? '✅' : '❌',
    'sort-packages': sortPackages ? '✅' : '❌',
    bin: bin ? '✅' : '❌',
  });
}

(async () => {
  const iterator = Iterator.forContributte();
  iterator.withComposer();
  iterator.fetch(node => {
    analyse(node);
  });
})();
