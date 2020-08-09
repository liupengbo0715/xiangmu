'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildDocsScript = buildDocsScript;
exports.buildDocsArgs = buildDocsArgs;
exports.defaultDocsRepoPath = defaultDocsRepoPath;

var _path = require('path');

const kibanaDir = (0, _path.resolve)(__dirname, '..', '..');

function buildDocsScript(cmd) {
  return (0, _path.resolve)(process.cwd(), cmd.docrepo, 'build_docs.pl');
}

function buildDocsArgs(cmd) {
  const docsIndexFile = (0, _path.resolve)(kibanaDir, 'docs', 'index.asciidoc');
  const xpackDocsPath = (0, _path.resolve)(kibanaDir, 'x-pack', 'docs');
  let args = ['--doc', docsIndexFile, '--resource', xpackDocsPath, '--chunk=1'];
  if (cmd.open) {
    args = [...args, '--open'];
  }
  return args;
}

function defaultDocsRepoPath() {
  return (0, _path.resolve)(kibanaDir, '..', 'docs');
}