import sortDiff from '../utils';

const indentationStep = 2;

const stringify = (key, value, prepend, indent) => {
  let valuePresentation;
  if (typeof value === 'object') {
    const lines = Object.entries(value).map(([a, b]) => `${' '.repeat(indent + indentationStep * 3)}${a}: ${b}`);
    valuePresentation = `{\n${lines}\n${' '.repeat(indent + indentationStep)}}`;
  } else {
    valuePresentation = value;
  }
  return `${' '.repeat(indent)}${prepend} ${key}: ${valuePresentation}`;
};

const parse = (diffs, indent = indentationStep) => {
  const sortedDiff = sortDiff(diffs);
  return sortedDiff.reduce((acc, diff) => {
    switch (diff.type) {
      case 'added': {
        acc.push(stringify(diff.key, diff.value, '+', indent));
        break;
      }
      case 'removed': {
        acc.push(stringify(diff.key, diff.value, '-', indent));
        break;
      }
      case 'unchanged': {
        acc.push(stringify(diff.key, diff.value, ' ', indent));
        break;
      }
      case 'changed': {
        acc.push(stringify(diff.key, diff.oldValue, '-', indent));
        acc.push(stringify(diff.key, diff.newValue, '+', indent));
        break;
      }
      case 'deepChanged': {
        const childLines = `${parse(diff.children, indent + indentationStep * 2)}\n`;
        const wrapping = `${' '.repeat(indent + indentationStep)}${diff.key}: {\n${childLines}${' '.repeat(indent + indentationStep)}}`;
        acc.push(wrapping);
        break;
      }
      default: {
        return acc;
      }
    }
    return acc;
  }, []).join('\n');
};

const render = (diffs) => `{\n${parse(diffs)}\n}`;

export default render;
