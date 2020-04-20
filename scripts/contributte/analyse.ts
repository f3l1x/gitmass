import _ from "lodash";
import path from "path";
import fs from "fs";
import semver from "semver";
import { iterFileRepo } from "@libs/utils/repos";

function supportNette3(repo: DataRepo, repoPath: string) {
  // Parse composer.json
  const composer = _parseComposer(repoPath);
  if (!composer) return;

  const supported: Structure = {};
  const unsupported: Structure = {};

  const analyse = (version: string, name: string): void => {
    if (!_.startsWith(name, 'nette/')) return;

    if (semver.satisfies('3.0.0', version)) {
      // console.log(`${name}:${version}`);
      supported[name] = version;
    } else {
      unsupported[name] = version;
    }
  }

  // Deps + Devdeps
  _.forEach(composer['require'] || [], analyse);
  _.forEach(composer['require-dev'] || [], analyse);

  if (!_.isEmpty(supported) && _.isEmpty(unsupported)) {
    console.log(`${repo.full_name} supports Nette 3`);
  } else {
    console.error(`${repo.full_name} does NOT support Nette 3`);
  }
}

// function supportPhp(repo: DataRepo, repoPath: string) {
//   // Parse composer.json
//   const composer = _parseComposer(repoPath);
//   if (!composer) return;

//   let support = null;
//   const versions = [];

//   const analyse = (version, name) => {
//     if (name !== 'php') return;
//     support = true;

//     if (semver.satisfies('5.6.0', version)) versions.push('5.6');
//     if (semver.satisfies('7.0.0', version)) versions.push('7.0');
//     if (semver.satisfies('7.1.0', version)) versions.push('7.1');
//     if (semver.satisfies('7.2.0', version)) versions.push('7.2');
//     if (semver.satisfies('7.3.0', version)) versions.push('7.3');
//     if (semver.satisfies('7.4.0', version)) versions.push('7.4');
//     if (semver.satisfies('8.0.0', version)) versions.push('8.0');
//   }

//   // Deps + Devdeps
//   _.forEach(composer['require'] || [], analyse);
//   _.forEach(composer['require-dev'] || [], analyse);

//   if (support === null) {
//     console.log(`${repo.full_name} does not contain php: x.y constraint`);
//   } else if (support === true) {
//     console.log(`${repo.full_name} supports ${versions.join(', ')} PHP versions`);
//   }
// }

// function supportBranchAlias(repo: DataRepo, repoPath: string) {
//   // Parse composer.json
//   const composer = _parseComposer(repoPath);
//   if (!composer) return;

//   if (!_.has(composer, 'extra.branch-alias')) {
//     console.log(`${repo.full_name} does not have defined composer.extra.branch-alias`);
//   }
// }

function supportDocs(repo: DataRepo, repoPath: string) {
  if (!fs.existsSync(path.join(repoPath, '.docs'))) {
    console.log(`${repo.full_name} does not have .docs folder`);
  }
}

function _parseComposer(repoPath: string) {
  if (!fs.existsSync(`${repoPath}/composer.json`)) {
    console.error(`File ${repoPath}/composer.json not found`);
    return null;
  }

  return JSON.parse(fs.readFileSync(`${repoPath}/composer.json`).toString());
}

(async () => {
  iterFileRepo(
    {
      filter: (repo: DataRepo) => {
        if (repo.archived) return false;
        if (_.startsWith(repo.full_name, 'contributte/')) return true;
        if (_.startsWith(repo.full_name, 'apitte/')) return true;
        if (_.startsWith(repo.full_name, 'nettrine/')) return true;
        return false;
      }
    },
    (repo: DataRepo, repoPath: string): void => {
      supportNette3(repo, repoPath);
      if (false) {
        supportDocs(repo, repoPath);
        // supportPhp(repo, repoPath);
        // supportBranchAlias(repo, repoPath);
      }
    },
    (repo: DataRepo) => {
      console.log(`Repo ${repo.full_name} not found. Clone it first`);
    }
  );
})();
