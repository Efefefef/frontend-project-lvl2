import program from 'commander';
import parseFile from './parsers';
import formatters from './formatters';

const findDiffs = (obj1, obj2) => {
  const sameKeyLines = Object.keys(obj2)
    .filter((key) => Object.hasOwnProperty.call(obj1, key) && Object.hasOwnProperty.call(obj2, key))
    .map((key) => {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        return { type: 'deepChanged', key, children: findDiffs(obj1[key], obj2[key]) };
      }
      if (obj1[key] === obj2[key]) {
        return { type: 'unchanged', key, value: obj1[key] };
      }
      return {
        type: 'changed', key, oldValue: obj1[key], newValue: obj2[key],
      };
    });
  const addedLines = Object.keys(obj2)
    .filter((key) => obj1[key] === undefined)
    .map((key) => ({ type: 'added', key, value: obj2[key] }));
  const removedLines = Object.keys(obj1)
    .filter((key) => obj2[key] === undefined)
    .map((key) => ({ type: 'removed', key, value: obj1[key] }));
  return [...sameKeyLines, ...removedLines, ...addedLines];
};

const genDiff = (pathToFile1, pathToFile2, format) => {
  const before = parseFile(pathToFile1);
  const after = parseFile(pathToFile2);
  const diff = findDiffs(before, after);
  if (format === 'plain') {
    return formatters.plainFormatter(diff);
  }
  return formatters.defaultFormatter(diff);
};

export const startUtil = () => {
  program
    .version('0.0.1')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(genDiff(firstConfig, secondConfig, program.format));
    })
    .option('-f, --format <format>', 'output format', 'default');
  program.description('Compares two configuration files and shows a difference.');
  program.parse(process.argv);
};

export default genDiff;
