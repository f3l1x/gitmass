import { Iterator } from "@libs/utils/repos";
import { octokit } from "@libs/http/github";

function update(node: IteratorNode) {
  // @todo Endpoint is missing at Github API
  // octokit.repos.update({
  //   owner: node.repo.owner.login,
  //   repo: node.repo.name,
  //   social: ...
  // })
}

(async () => {
  const iterator = Iterator.forNettrineOnly();
  iterator.fetch(async (node) => {
    update(node);
  });
})();
