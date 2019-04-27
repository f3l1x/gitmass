import _ from "lodash";
import { iterFileRepo } from "./../utils/repos";

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
        diffRepo,
        repo => {
            console.log(`Repo ${repo.full_name} not found. Clone it first`);
        }
    );
})();

function diffRepo(repo, repoPath) {
    supportNette3(repo, repoPath);
}

function supportNette3(repo, repoPath) {

}