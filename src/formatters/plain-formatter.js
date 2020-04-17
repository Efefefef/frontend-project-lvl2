import sortDiff from '../utils';

const buildPath = (key, path) => path + key;

const stringify = (value) => {
  if (typeof value === 'object') return '[complex value]';
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value;
  return `'${value}'`;
};

const parse = (diffs, path = '') => {
  const sortedDiff = sortDiff(diffs);
  return sortedDiff.reduce((acc, diff) => {
    switch (diff.type) {
      case 'added': {
        acc.push(`Property '${buildPath(diff.key, path)}' was added with value: ${stringify(diff.value)}`);
        break;
      }
      case 'removed': {
        acc.push(`Property '${buildPath(diff.key, path)}' was deleted`);
        break;
      }
      case 'changed': {
        acc.push(`Property '${buildPath(diff.key, path)}' was changed from ${stringify(diff.oldValue)} to ${stringify(diff.newValue)}`);
        break;
      }
      case 'deepChanged': {
        acc.push(parse(diff.children, `${buildPath(diff.key, path)}.`).join('\n'));
        break;
      }
      default: {
        return acc;
      }
    }
    return acc;
  }, []);
};

const render = (diffs) => `${parse(diffs).join('\n')}`;

export default render;
