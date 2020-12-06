import path from "path";

export const TMP_DIR = path.resolve(__dirname, "./../tmp");

export const DATA_DIR = path.resolve(__dirname, "./../data");

export const GITHUB_DIR = path.resolve(__dirname, "./../data/github");

export const ORGANIZATIONS = {
    // Nette
    nette: () => require('./../data/github/nette.json'),
    contributte: () => require('./../data/github/contributte.json'),
    apitte: () => require('./../data/github/apitte.json'),
    nettrine: () => require('./../data/github/nettrine.json'),
    planette: () => require('./../data/github/ninjify.json'),
    phalette: () => require('./../data/github/phalette.json'),
    // PHP
    ninjify: () => require('./../data/github/planette.json'),
    // Docker
    dockette: () => require('./../data/github/dockette.json'),
    // Training
    trainit: () => require('./../data/github/trainit.json'),
    // Lambda(s)
    juicyfx: () => require('./../data/github/juicyfx.json'),
    // WebKit
    webkitty: () => require('./../data/github/webkitty.json'),
    // R&D
    pwnlabs: () => require('./../data/github/pwnlabs.json'),
    f00b4r: () => require('./../data/github/f00b4r.json'),
    // Companies
    netrixone: () => require('./../data/github/netrixone.json'),
    tlapnet: () => require('./../data/github/tlapnet.json'),
    ispalliance: () => require('./../data/github/ispalliance.json'),
    beetfit: () => require('./../data/github/beetfit.json'),
    flowsource: () => require('./../data/github/flowsource.json'),
    // E-gov
    krhk: () => require('./../data/github/krhk.json'),
};

export const CONTRIBUTTE = [
  'contributte',
  'nettrine',
  'apitte',
];

export const COMPANIES = [
  'netrixone',
  'tlapnet',
  'ispalliance',
  'beetfit',
  'flowsource',
];
