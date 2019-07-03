const _ = require('lodash');
const https = require("https");

// =================================

const { TOKEN } = require('./../config');
const repositories = require('./../data/contributte');

function listAllGitterWebhooks() {
    _.forEach(repositories, repo => {
        listGitterWebooks(repo);
    })
}

function listGitterWebooks(repo) {
    const options = {
        hostname: `api.github.com`,
        path: `/repos/contributte/${repo.name}/hooks?access_token=${TOKEN}`,
        headers: { 'User-Agent': 'Contributte' }
    };

    https.get(options, (res) => {
        let data = '';
        res.on('data', (d) => data += d);
        res.on('end', () => {
            const hooks = JSON.parse(data);
            hooks.forEach(hook => deleteWebhook(repo, hook))
        });

    }).on('error', (e) => {
        console.error(e);
    });
}

function deleteWebhook(repo, webhook) {
    // Skip non-gitter webhooks
    if (!/https:\/\/webhooks.gitter.im\/e\/[a-zA-Z0-9]+/.test(webhook.config.url)) return;

    const options = {
        hostname: `api.github.com`,
        path: `/repos/contributte/${repo.name}/hooks/${webhook.id}?access_token=${TOKEN}`,
        method: 'DELETE',
        headers: { 'User-Agent': 'Contributte' }
    };

    const req = https.request(options, (res) => {
        console.log(`[${repo.name}]: removed webhook: ${webhook.config.url}`);
    }).on('error', (e) => {
        console.error(e);
    });

    req.end();
}

(async () => {
    // listGitterWebooks({name: 'console-extra'});
    listAllGitterWebhooks();
})();