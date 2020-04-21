const indentationStep = 2;

const stringify = (key, value, prepend, indent) => {
  if (typeof value === 'object') {
    const lines = Object.entries(value).map(([a, b]) => `${' '.repeat(indent + indentationStep * 3)}${a}: ${b}`);
    return `${' '.repeat(indent)}${prepend} ${key}: {\n${lines}\n${' '.repeat(indent + indentationStep)}}`;
  }
  return `${' '.repeat(indent)}${prepend} ${key}: ${value}`;
};

const parse = (diffs, indent = indentationStep) => diffs.map((diff) => {
  switch (diff.type) {
    case 'added': {
      return stringify(diff.key, diff.value, '+', indent);
    }
    case 'removed': {
      return stringify(diff.key, diff.value, '-', indent);
    }
    case 'unchanged': {
      return stringify(diff.key, diff.value, ' ', indent);
    }
    case 'changed': {
      return `${stringify(diff.key, diff.oldValue, '-', indent)}\n${stringify(diff.key, diff.newValue, '+', indent)}`;
    }
    case 'deepChanged': {
      const childLines = `${parse(diff.children, indent + indentationStep * 2)}\n`;
      const wrapping = `${' '.repeat(indent + indentationStep)}${diff.key}: {\n${childLines}${' '.repeat(indent + indentationStep)}}`;
      return wrapping;
    }
    default: {
      throw new Error(`Unknown diff type: ${diff.type}`);
    }
  }
}).join('\n');

const render = (diffs) => `{\n${parse(diffs)}\n}`;

export default render;
