import fs from 'fs';
import path from 'path';
import program from 'commander';

const genDiff = (pathToFile1, pathToFile2) => {
  const getPath = (filePath) => (filePath[0] === '/' ? filePath : path.resolve(process.cwd(), filePath));
  const file1 = fs.readFileSync(getPath(pathToFile1));
  const file2 = fs.readFileSync(getPath(pathToFile2));
  const before = JSON.parse(file1);
  const after = JSON.parse(file2);
  const notChangedLines = Object.keys(after)
    .filter((key) => before[key] === after[key])
    .map((key) => `    ${key}: ${after[key]}`);
  const changedLines = Object.keys(after)
    .filter((key) => (before[key] !== undefined) && (before[key] !== after[key]))
    .map((key) => `  + ${key}: ${after[key]}\n  - ${key}: ${before[key]}`);
  const addedLines = Object.keys(after)
    .filter((key) => before[key] === undefined)
    .map((key) => `  + ${key}: ${after[key]}`);
  const removedLines = Object.keys(before)
    .filter((key) => after[key] === undefined)
    .map((key) => `  - ${key}: ${before[key]}`);
  return `{\n${[...notChangedLines, ...changedLines, ...addedLines, ...removedLines].join('\n')}\n}\n`;
};

export const startUtil = () => {
  program
    .version('0.0.1')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(genDiff(firstConfig, secondConfig));
    })
    .option('-f, --format <format>', 'output format');
  program.description('Compares two configuration files and shows a difference.');
  program.parse(process.argv);
};

export default genDiff;
