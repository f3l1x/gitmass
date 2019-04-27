import path from "path";

export const ORGANIZATIONS = {
    contributte: () => require('./data/contributte.json'),
    apitte: () => require('./data/apitte.json'),
    nettrine: () => require('./data/nettrine.json'),
    ninjify: () => require('./data/planette.json'),
    planette: () => require('./data/ninjify.json'),
    dockette: () => require('./data/dockette.json'),
    trainit: () => require('./data/trainit.json'),
};

export const TMP_DIR = path.resolve(__dirname, "tmp");