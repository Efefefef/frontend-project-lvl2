import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseData from './parsers';
import render from './formatters';

const readFile = (pathToFile) => fs.readFileSync(path.resolve(pathToFile), 'utf-8');

const buildDiff = (obj1, obj2) => {
  const unitedKeys = _.union(_.keys(obj1), _.keys(obj2));
  return unitedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { type: 'added', key, value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { type: 'removed', key, value: obj1[key] };
    }
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return { type: 'deepChanged', key, children: buildDiff(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        type: 'changed', key, oldValue: obj1[key], newValue: obj2[key],
      };
    }
    return { type: 'unchanged', key, value: obj1[key] };
  });
};

const genDiff = (pathToFile1, pathToFile2, format) => {
  const fileDataBefore = parseData(readFile(pathToFile1), path.extname(pathToFile1).slice(1));
  const fileDataAfter = parseData(readFile(pathToFile2), path.extname(pathToFile2).slice(1));
  const diff = buildDiff(fileDataBefore, fileDataAfter);
  return render(diff, format);
};

export default genDiff;
