const _ = require('lodash');
const https = require("https");
import SECRET from "./../../secret";

const orgs = {
    contributte: require('./../../data/contributte.json'),
    apitte: require('./../../data/apitte.json'),
    nettrine: require('./../../data/nettrine.json'),
}

function updateProjects() {
    _.forEach(orgs, org => {
        _.forEach(org, repo => {
            updateProject(repo);
        })
    })
}

function updateProject(repo) {
    const data = {
        "name": repo.name,
    };

    decorateProjectHomepage(repo, data);
    decorateProjectButtons(repo, data);

    const options = {
        hostname: `api.github.com`,
        path: `/repos/${repo.full_name}`,
        method: 'PATCH',
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${SECRET.TOKEN}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Contributte'
        },
    };

    const req = https.request(options, (res) => {
        // console.log(`STATUS: ${res.statusCode}`);
        // console.log(`HEADERS`, res.headers);

        let rdata = '';
        res.on('data', d => rdata += d);
        res.on('end', () => {
            // console.log(rdata);
            if (res.statusCode === 200) console.log(`${repo.full_name} updated`);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(JSON.stringify(data));
    req.end();
}

function decorateProjectHomepage(repo, data) {
    data.homepage = `https://contributte.org/packages/${repo.full_name}.html`;
}

function decorateProjectButtons(repo, data) {
    data.allow_squash_merge = false;
    data.allow_merge_commit = false;
    data.allow_rebase_merge = true;
}

(async () => {
    // setHomepage({ name: "mobilni-platby" });
    updateProjects();
})();