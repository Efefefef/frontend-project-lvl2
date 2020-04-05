import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import ini from 'ini';

const parseFile = (pathToFile) => {
  const getPath = (filePath) => (filePath[0] === '/' ? filePath : path.resolve(process.cwd(), filePath));
  const format = path.extname(pathToFile);
  const data = fs.readFileSync(getPath(pathToFile), 'utf-8');
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


export default parseFile;
