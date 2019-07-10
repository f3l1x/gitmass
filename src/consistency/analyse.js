import _ from "lodash";
import debug from "debug";
import path from "path";
import * as fs from "fs";
import semver from "semver";
import { iterFileRepo } from "../utils/repos";

const LOGGER = debug('debug');

function analyseRepo(repo, repoPath) {
    // supportNette3(repo, repoPath);
    // supportPhp(repo, repoPath);
    // supportBranchAlias(repo, repoPath);
    supportDocs(repo, repoPath);
}

function supportNette3(repo, repoPath) {
    // Parse composer.json
    const composer = _parseComposer(repoPath);
    if (!composer) return;

    const supported = {};
    const unsupported = {};

    const analyse = (version, name) => {
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
    }
}

function supportPhp(repo, repoPath) {
    // Parse composer.json
    const composer = _parseComposer(repoPath);
    if (!composer) return;

    let support = null;
    const versions = [];

    const analyse = (version, name) => {
        if (name !== 'php') return;
        support = true;

        if (semver.satisfies('5.6.0', version)) versions.push('5.6');
        if (semver.satisfies('7.0.0', version)) versions.push('7.0');
        if (semver.satisfies('7.1.0', version)) versions.push('7.1');
        if (semver.satisfies('7.2.0', version)) versions.push('7.2');
        if (semver.satisfies('7.3.0', version)) versions.push('7.3');
        if (semver.satisfies('7.4.0', version)) versions.push('7.4');
        if (semver.satisfies('8.0.0', version)) versions.push('8.0');
    }

    // Deps + Devdeps
    _.forEach(composer['require'] || [], analyse);
    _.forEach(composer['require-dev'] || [], analyse);

    if (support === null) {
        console.log(`${repo.full_name} does not contain php: x.y constraint`);
    } else if (support === true) {
        console.log(`${repo.full_name} supports ${versions.join(', ')} PHP versions`);
    }
}

function supportBranchAlias(repo, repoPath) {
    // Parse composer.json
    const composer = _parseComposer(repoPath);
    if (!composer) return;

    if (!_.has(composer, 'extra.branch-alias')) {
        console.log(`${repo.full_name} does not have defined composer.extra.branch-alias`);
    }
}

function supportDocs(repo, repoPath) {
    if (!fs.existsSync(path.join(repoPath, '.docs'))) {
        console.log(`${repo.full_name} does not have .docs folder`);
    }
}

function _parseComposer(path) {
    if (!fs.existsSync(`${path}/composer.json`)) {
        LOGGER(`File ${path}/composer.json not found`);
        return null;
    }

    return JSON.parse(fs.readFileSync(`${path}/composer.json`));
}

(async () => {
    iterFileRepo(
        {
            filter: repo => {
                if (repo.archived) return false;
                if (_.startsWith(repo.full_name, 'contributte/')) return true;
                if (_.startsWith(repo.full_name, 'apitte/')) return true;
                if (_.startsWith(repo.full_name, 'nettrine/')) return true;
                return false;
            }
        },
        analyseRepo,
        repo => {
            LOGGER(`Repo ${repo.full_name} not found. Clone it first`);
        }
    );
})();