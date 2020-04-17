import defaultRender from './default-formatter';
import plainRender from './plain-formatter';
import jsonRender from './json-formatter';

const render = (diff, format) => {
  if (format === 'plain') return plainRender(diff);
  if (format === 'json') return jsonRender(diff);
  return defaultRender(diff);
};

export default render;
