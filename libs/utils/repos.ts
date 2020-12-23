import _ from "lodash";
import { forEachSeries } from "async";
import fs from "fs";
import { ORGANIZATIONS, TMP_DIR } from "@app/config";

export class Iterator {
  private _limit?: number;
  private _composer?: boolean;
  private _filters: ((repo: DataRepo) => boolean)[] = [];
  private _errors: string[] = [];

  private _counter: number = 0;

  constructor() {
  }

  static create(): Iterator {
    return new Iterator();
  }

  static forAll(): Iterator {
    return Iterator
      .create()
      .withFilter((repo) => {
        if (repo.archived) return false;
        return true;
      });
  }

  static forContributte(): Iterator {
    return Iterator
      .create()
      .withFilter((repo) => {
        if (repo.archived) return false;
        if (_.startsWith(repo.full_name, 'contributte/')) return true;
        if (_.startsWith(repo.full_name, 'apitte/')) return true;
        if (_.startsWith(repo.full_name, 'nettrine/')) return true;
        return false;
      });
  }

  static forContributteOnly(): Iterator {
    return Iterator
      .create()
      .withFilter((repo) => {
        if (repo.archived) return false;
        if (_.startsWith(repo.full_name, 'contributte/')) return true;
        return false;
      });
  }

  static forApitteOnly(): Iterator {
    return Iterator
      .create()
      .withFilter((repo) => {
        if (repo.archived) return false;
        if (_.startsWith(repo.full_name, 'apitte/')) return true;
        return false;
      });
  }

  static forNettrineOnly(): Iterator {
    return Iterator
      .create()
      .withFilter((repo) => {
        if (repo.archived) return false;
        if (_.startsWith(repo.full_name, 'nettrine/')) return true;
        return false;
      });
  }

  static forMainstream(): Iterator {
    return Iterator
      .create()
      .withFilter((repo) => {
        if (repo.archived) return false;
        if (_.startsWith(repo.full_name, 'contributte/')) return true;
        if (_.startsWith(repo.full_name, 'apitte/')) return true;
        if (_.startsWith(repo.full_name, 'nettrine/')) return true;
        if (_.startsWith(repo.full_name, 'dockette/')) return true;
        if (_.startsWith(repo.full_name, 'ninjify')) return true;
        if (_.startsWith(repo.full_name, 'pwnlabs')) return true;
        if (_.startsWith(repo.full_name, 'juicyfx')) return true;
        if (_.startsWith(repo.full_name, 'webkitty')) return true;
        if (_.startsWith(repo.full_name, 'phalette')) return true;
        if (_.startsWith(repo.full_name, 'trainit')) return true;
        return false;
      });
  }
  withComposer(): this {
    this._composer = true;
    return this;
  }

  withFilter(callback: (repo: DataRepo) => boolean): this {
    this._filters.push(callback);
    return this;
  }

  withLimit(limit: number): this {
    this._limit = limit;
    return this;
  }

  fetch(callback: IteratorCallback) {
    _.forEach(ORGANIZATIONS, (load: () => any[]) => {
      let repos = _(load());

      this._filters.forEach(filter => {
        repos = repos.filter(filter);
      });

      forEachSeries<DataRepo>(repos.value(), async (repo) => {
        if (this._limit !== undefined && this._counter >= this._limit) throw "Iterator limit";

        const repoKey = `${repo.owner.login}-${repo.name}`;
        const repoPath = `${TMP_DIR}/${repoKey}`;
        const composer = this._composer ? this._parseComposer(repoPath) : undefined;

        await callback({
          repo,
          path: repoPath,
          exists: fs.existsSync(repoPath),
          composer
        });

        this._counter++;
      });
    });

    if (this._errors.length > 0) {
      console.table(this._errors);
    }
  }

  _parseComposer(path: string) {
    if (!fs.existsSync(`${path}/composer.json`)) {
      this._errors.push(`File ${path}/composer.json not found`);
      return null;
    }

    return JSON.parse(fs.readFileSync(`${path}/composer.json`).toString());
  }

}
