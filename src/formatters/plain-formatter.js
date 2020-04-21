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
  return sortedDiff.map((diff) => {
    switch (diff.type) {
      case 'added': {
        return `Property '${buildPath(diff.key, path)}' was added with value: ${stringify(diff.value)}`;
      }
      case 'removed': {
        return `Property '${buildPath(diff.key, path)}' was deleted`;
      }
      case 'changed': {
        return `Property '${buildPath(diff.key, path)}' was changed from ${stringify(diff.oldValue)} to ${stringify(diff.newValue)}`;
      }
      case 'deepChanged': {
        return parse(diff.children, `${buildPath(diff.key, path)}.`).join('\n');
      }
      case 'unchanged': {
        return null;
      }
      default: {
        throw new Error(`Unknown diff type: ${diff.type}`);
      }
    }
  }).filter((diff) => diff);
};

const render = (diffs) => `${parse(diffs).join('\n')}`;

export default render;
