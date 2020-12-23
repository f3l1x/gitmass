import { Iterator } from "@libs/utils/repos";
import { octokit } from "@libs/http/github";

function update(node: IteratorNode) {
  octokit.repos.update({
    owner: node.repo.owner.login,
    repo: node.repo.name,
    homepage: `https://contributte.org/packages/${node.repo.full_name}.html`,
  })
}

(async () => {
  const iterator = Iterator.forContributte();
  iterator.fetch(async (node) => {
    update(node);
  });
})();
