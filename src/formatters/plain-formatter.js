const buildPath = (key, path) => path + key;

const stringify = (value) => {
  if (typeof value === 'object') return '[complex value]';
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value;
  return `'${value}'`;
};

const sortDiff = (diff) => diff.sort((a, b) => {
  if (a.key > b.key) {
    return 1;
  }
  if (b.key > a.key) {
    return -1;
  }
  return 0;
});

const parse = (diffs, path = '') => sortDiff(diffs).reduce((acc, diff) => {
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

const render = (diffs) => `${parse(diffs).join('\n')}\n`;

export default render;
