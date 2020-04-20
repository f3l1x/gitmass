import _ from "lodash";
import REPOSITORIES from "@data/github/contributte.json";

const SKIPPED = [
    'generator-nette',
    'website',
    'blogette',
    'server-timing',
    'advisories',
]

function generateSql() {
    const sqls: string[] = [];

    _.filter(REPOSITORIES, r => !SKIPPED.includes(r.name))
        .forEach(repo => {
            const sql = `INSERT INTO \`addon\` (\`type\`, \`state\`, \`author\`, \`name\`, \`rating\`, \`created_at\`, \`updated_at\`) VALUES (1, 1, '${repo.owner.login}', '${repo.name}', NULL, now(), NULL);`;
            sqls.push(sql);
        });

    return sqls.map(s => {
        console.log(s);
    })
}

(async () => {
    generateSql();
})();
