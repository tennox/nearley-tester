#!/usr/bin/env node
const program = require('commander');
const { version } = require('../package.json');
const nearleyTester = require('../');

const parsed = program
  .version(version)
  .usage('[options] <tests-glob>', 'Tests glob pattern')
  .option('-w, --watch-glob-patterns <patterns>', 'Additional glob patterns for grammar reload: "src/**,other/**"', list)
  .option('--no-watch', 'Run once and exit')
  .option('-r, --raw-grammar <file>', 'Raw grammar file (eg: grammar.ne)')
  .option('-g, --grammar <file>', 'Compiled grammar file (eg: grammar.js)')
  .option('-e, --expect <folder>', 'Folder with expected resulting outputs')
  .option('-tp, --test-name-pattern <pattern>', 'Pattern for test names / test delimitter, defaults to "**/*"')
  .option('-dpj, --disable-pretty-json', 'Flag for pretty json, defaults to false')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  // console.log(program)
  const options = {
    rawGrammarFile: program.rawGrammar,
    grammarFile: program.grammar,
    expectFolder: program.expect,
    testNamePattern: program.testNamePattern,
    watchGlobPatterns: program.watchGlobPatterns,
    testsGlobPattern: program.args[0],
    disablePrettyJson: program.disablePrettyJson,
    watch: program.watch,
  };
  
  nearleyTester(options);
}

function list(val) {
  return val.split(',');
}
