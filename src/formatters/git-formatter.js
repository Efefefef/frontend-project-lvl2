const indentationStep = 2;

const stringify = (key, value, prepend, indent) => {
  if (typeof value !== 'object') {
    return `${' '.repeat(indent)}${prepend} ${key}: ${value}`;
  }
  const lines = Object.entries(value).map(([a, b]) => `${' '.repeat(indent + indentationStep * 3)}${a}: ${b}`);
  return `${' '.repeat(indent)}${prepend} ${key}: {\n${lines}\n${' '.repeat(indent + indentationStep)}}`;
};

const format = (diffs, depth = 0) => diffs.map((diff) => {
  const indent = depth * 2 * indentationStep + indentationStep;
  const nestedIndent = indent + indentationStep;
  switch (diff.type) {
    case 'added':
      return stringify(diff.key, diff.value, '+', indent);
    case 'removed':
      return stringify(diff.key, diff.value, '-', indent);
    case 'unchanged':
      return stringify(diff.key, diff.value, ' ', indent);
    case 'changed':
      return `${stringify(diff.key, diff.oldValue, '-', indent)}\n${stringify(diff.key, diff.newValue, '+', indent)}`;
    case 'nested': {
      const childLines = `${format(diff.children, depth + 1)}\n`;
      const wrapping = `${' '.repeat(nestedIndent)}${diff.key}: {\n${childLines}${' '.repeat(nestedIndent)}}`;
      return wrapping;
    }
    default:
      throw new Error(`Unknown diff type: ${diff.type}`);
  }
}).join('\n');

const render = (diffs) => `{\n${format(diffs)}\n}`;

export default render;
