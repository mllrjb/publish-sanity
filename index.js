#!/usr/bin/env node
'use strict';

const path = require('path')
    , packageJson = require(path.join(process.cwd(), 'package.json'))
    , fs = require('fs-extra')
    , spawnSync = require('child_process').spawnSync
    , yargs = require('yargs');

const cwd = process.cwd()
    , temp = path.join(cwd, '.tmp/publish')
    , name = packageJson.name
    // handle @
    , tarball = name.replace(/^@/, '').replace(/\//g, '-') + '-' + packageJson.version + '.tgz'
    , tarballPath = path.join(cwd, tarball);

fs.removeSync(temp);
fs.removeSync(tarballPath);

const packArgs = ['pack'];
if (yargs.argv.ignoreScripts) {
  packArgs.push('--ignore-scripts');
}
const packResult = spawnSync('npm', packArgs, {
  cwd: cwd,
  stdio: 'inherit',
  stderr: 'inherit'
});
if (packResult.status !== 0) {
  console.log('unable to pack module');
  process.exit(1);
}

fs.mkdirsSync(temp);
fs.writeJsonSync(path.join(temp, 'package.json'), {
  name: 'test-publish',
  version: '0.0.0'
});
fs.writeFileSync(path.join(temp, 'test.js'), "'use strict';\n\nvar sut = require('" + name + "');\n\nconsole.log('require(\\'" + name + "\\') => ok');");

const installResult = spawnSync('npm', ['install', tarballPath], {
  cwd: temp,
  stdio: 'inherit',
  stderr: 'inherit'
});
if (installResult.status !== 0) {
  console.log('unable to install module from tarball');
  process.exit(1);
}

const testResult = spawnSync('node', ['test.js'], {
  cwd: temp,
  stdio: 'inherit',
  stderr: 'inherit'
});
if (testResult.status !== 0) {
  console.log('unable to require module!')
  process.exit(1);
} else {
  console.log('successfully installed and required module');
  process.exit(0);
}
