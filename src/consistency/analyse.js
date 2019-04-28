import _ from "lodash";
import debug from "debug";
import * as fs from "fs";
import semver from "semver";
import { iterFileRepo } from "../utils/repos";

const LOGGER = debug('debug');

(() => {
    iterFileRepo(
        {
            filter: repo => {
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

function analyseRepo(repo, repoPath) {
    supportNette3(repo, repoPath);
    //supportPhp(repo, repoPath);
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
}


function _parseComposer(path) {
    if (!fs.existsSync(`${path}/composer.json`)) {
        LOGGER(`File ${path}/composer.json not found`);
        return null;
    }

    return JSON.parse(fs.readFileSync(`${path}/composer.json`));
}