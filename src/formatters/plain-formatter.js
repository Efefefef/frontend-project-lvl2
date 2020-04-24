const buildPath = (key, path) => path + key;

const stringify = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'boolean':
      return value;
    case 'number':
      return value;
    default:
      return `'${value}'`;
  }
};

const format = (diffs, path = '') => diffs.map((diff) => {
  switch (diff.type) {
    case 'added':
      return `Property '${buildPath(diff.key, path)}' was added with value: ${stringify(diff.value)}`;
    case 'removed':
      return `Property '${buildPath(diff.key, path)}' was deleted`;
    case 'changed':
      return `Property '${buildPath(diff.key, path)}' was changed from ${stringify(diff.oldValue)} to ${stringify(diff.newValue)}`;
    case 'nested':
      return format(diff.children, `${buildPath(diff.key, path)}.`).join('\n');
    case 'unchanged':
      return null;
    default:
      throw new Error(`Unknown diff type: ${diff.type}`);
  }
}).filter((diff) => diff);

const render = (diffs) => `${format(diffs).join('\n')}`;

export default render;
