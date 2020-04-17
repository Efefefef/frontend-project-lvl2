import _ from 'lodash';
import parseFile from './parsers';
import render from './formatters';

const buildDiff = (obj1, obj2) => {
  const uniqJointKeys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  return uniqJointKeys.map((key) => {
    let keyDiff;
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        keyDiff = { type: 'deepChanged', key, children: buildDiff(obj1[key], obj2[key]) };
      } else if (obj1[key] === obj2[key]) {
        keyDiff = { type: 'unchanged', key, value: obj1[key] };
      } else {
        keyDiff = {
          type: 'changed', key, oldValue: obj1[key], newValue: obj2[key],
        };
      }
    }
    if (!_.has(obj1, key)) {
      keyDiff = { type: 'added', key, value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      keyDiff = { type: 'removed', key, value: obj1[key] };
    }
    return keyDiff;
  });
};

const genDiff = (pathToFile1, pathToFile2, format) => {
  const fileDataBefore = parseFile(pathToFile1);
  const fileDataAfter = parseFile(pathToFile2);
  const diff = buildDiff(fileDataBefore, fileDataAfter);
  return render(diff, format);
};

export default genDiff;
