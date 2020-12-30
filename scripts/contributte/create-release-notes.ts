import { Iterator } from "@libs/utils/repos";
import { octokit } from "@libs/http/github";
import chalk from "chalk";
import semver from "semver";
import { requestGet } from "@libs/http/httpclient";

async function create(node: IteratorNode) {
  const resTags = await octokit.repos.listTags({
    owner: node.repo.owner.login,
    repo: node.repo.name,
    per_page: 100,
  });

  if (resTags.status !== 200) throw `Cannot list tags`;

  const tagMap = resTags.data
    .map(tag => tag.name)
    .sort()
    .reduce((map, tag) => {
      map[tag] = semver.clean(tag) || tag;
      return map;
    }, {} as { [key: string]: string });

  const tagKey = (tag: string) => {
    return Object.keys(tagMap).find(k => tagMap[k] === tag);
  }

  const prevTag = (tag: string) => {
    const keys = Object.keys(tagMap)
    const i = keys.indexOf(tag);
    if (i <= 0) return null;
    return tagKey(tagMap[keys[i - 1]]);
  }

  const nextTag = (tag: string) => {
    const keys = Object.keys(tagMap)
    const i = keys.indexOf(tag);
    if (i >= (keys.length - 1)) return null;
    return tagKey(tagMap[keys[i + 1]]);
  }

  for await (const tag of resTags.data) {
    try {
      const resRelease = await octokit.repos.getReleaseByTag({
        owner: node.repo.owner.login,
        repo: node.repo.name,
        tag: tag.name
      });
    } catch (e) {
      if (e.status === 404) {
        const base = prevTag(tag.name);
        const head = tag.name;

        const resNotes = await requestGet(`https://githubber.now.sh/repos/${node.repo.owner.login}/${node.repo.name}/release/notes?base=${base}&head=${head}`);

        const resCreatedRelease = await octokit.repos.createRelease({
          owner: node.repo.owner.login,
          repo: node.repo.name,
          tag_name: tag.name,
          name: tag.name,
          draft: false,
          body: resNotes.release,
        });

        if (resCreatedRelease.status !== 201) throw `Cannot create release`;

        console.log(chalk.green(`New release notes for ${node.repo.full_name}:${tag.name} created`));
      } else {
        console.log(chalk.red(`Relese of ${node.repo.full_name}:${tag.name} cannot be created`));
      }
    }
  }
}

(async () => {
  // const iterator = Iterator.forContributte();
  // iterator.fetch(async (node) => {
  //   await create(node);
  // });
  await create({ repo: { owner: { login: "contributte" }, name: "gopay-api" } } as any);
})();
