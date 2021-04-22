import _ from "lodash";
import { ORGANIZATIONS } from "@/config";
import { octokit } from "@/http/github";
import chalk from "chalk";

async function transferTrainit(): Promise<void> {
  const repos = (ORGANIZATIONS as any).trainit();

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

async function transferDeprecatedPackages(): Promise<void> {
  const repos = [
    { owner: "deprecated-packages", name: "gedmo" },
    { owner: "deprecated-packages", name: "dummy-events" },
    { owner: "deprecated-packages", name: "hydrator" },
    { owner: "deprecated-packages", name: "nette-checker" },
    { owner: "deprecated-packages", name: "model" },
    { owner: "deprecated-packages", name: "phpdoc" },
    { owner: "deprecated-packages", name: "latte-email" },
    { owner: "deprecated-packages", name: "GopaySimple" },
    { owner: "deprecated-packages", name: "event-application-bridge" },
    { owner: "deprecated-packages", name: "apitte-mapping" },
    { owner: "deprecated-packages", name: "event-security-bridge" },
    { owner: "deprecated-packages", name: "event-bridges" },
    { owner: "deprecated-packages", name: "api-router-project" },
    { owner: "deprecated-packages", name: "microapi" },
    { owner: "deprecated-packages", name: "fly-response" },
    { owner: "deprecated-packages", name: "ntdb" },
    { owner: "deprecated-packages", name: "cli-http-extension" },
    { owner: "deprecated-packages", name: "service-autoloader" },
    { owner: "deprecated-packages", name: "simple-blogger" },
    { owner: "deprecated-packages", name: "latte-parsedown" },
    { owner: "deprecated-packages", name: "model-specification" },
    { owner: "deprecated-packages", name: "uniparser" },
    { owner: "deprecated-packages", name: "thumbator" },
    { owner: "deprecated-packages", name: "micro-website-sandbox" },
    { owner: "deprecated-packages", name: "micro-website-module" },
    { owner: "deprecated-packages", name: "micro-core" },
    { owner: "deprecated-packages", name: "deployer-sandbox" },
    { owner: "deprecated-packages", name: "tester-sandbox" },
    { owner: "deprecated-packages", name: "latte-formatter" },
    { owner: "deprecated-packages", name: "imap" },
    { owner: "deprecated-packages", name: "kleinphp-smartyphp" },
    { owner: "deprecated-packages", name: "kleinphp-latte" },
    { owner: "deprecated-packages", name: "nette-plugins" },
  ];

  for (const repo of repos) {
    console.log(chalk.green(`Transfering ${repo.owner}/${repo.name}`));

    try {
      await octokit.repos.transfer({
        owner: repo.owner,
        repo: repo.name,
        new_owner: 'contributte'
      });
    } catch (e) {
      console.log(chalk.red(e));
    }
  }
}

// @wanted
(async () => {
  if (false) {
    await transferTrainit();
    await transferDeprecatedPackages();
  }
})();
