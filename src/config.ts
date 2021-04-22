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
    ninjify: () => require('./../data/github/ninjify.json'),
    // Docker
    dockette: () => require('./../data/github/dockette.json'),
    // Lambda(s)
    juicyfx: () => require('./../data/github/juicyfx.json'),
    // R&D
    f00b4r: () => require('./../data/github/f00b4r.json'),
};

export const CONTRIBUTTE = [
  'contributte',
  'nettrine',
  'apitte',
];
