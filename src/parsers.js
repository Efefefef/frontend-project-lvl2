import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import ini from 'ini';

const getPath = (filePath) => (filePath[0] === '/' ? filePath : path.resolve(process.cwd(), filePath));

const parseData = (data, format) => {
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.safeLoad;
  } else if (format === '.ini') {
    parse = ini.parse;
  }
  return parse(data);
};

const parseFile = (pathToFile) => {
  const data = fs.readFileSync(getPath(pathToFile), 'utf-8');
  const format = path.extname(pathToFile);
  return parseData(data, format);
};

export default parseFile;
