import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each(['json', 'yml', 'ini'])('%s default format', (extenstion) => {
  const result = genDiff(getFixturePath(`before.${extenstion}`), getFixturePath(`after.${extenstion}`));
  const expected = readFile('result-default.txt');
  expect(result).toEqual(expected);
});

test.each(['json', 'yml', 'ini'])('%s plain format', (extenstion) => {
  const result = genDiff(getFixturePath(`before.${extenstion}`), getFixturePath(`after.${extenstion}`), 'plain');
  const expected = readFile('result-plain.txt');
  expect(result).toEqual(expected);
});
