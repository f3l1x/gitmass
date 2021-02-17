import _ from "lodash";
import { ORGANIZATIONS } from "@app/config";
import { octokit } from "@libs/http/github";
import chalk from "chalk";

async function transfer(): Promise<void> {
  const repos = ORGANIZATIONS.trainit();

  for (const repo of repos) {
    console.log(chalk.green(`Transfering ${repo.full_name}`));

    try {
      await octokit.repos.transfer({
        owner: repo.owner.login,
        repo: repo.name,
        new_owner: 'f00b4r'
      });
    } catch (e) {
      console.log(chalk.red(e));
    }
  }
}

// @wanted
(async () => await transfer())();
