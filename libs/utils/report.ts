import chalk from "chalk";

export class Report {
  private _rows: any[] = [];
  private _title?: string = undefined;

  static init(title: string): Report {
    const inst = new Report();
    inst._title = title;

    process.on('exit', () => {
      inst.dump();
    });

    return inst;
  }

  add(row: any): this {
    this._rows.push(row);
    return this;
  }

  dump(): void {
    console.log(chalk.green(this._title));
    console.table(this._rows);
  }
}
