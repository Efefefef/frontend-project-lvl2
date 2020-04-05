import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('before -> after', () => {
  const result = genDiff(getFixturePath('before.json'), getFixturePath('after.json'));
  const expected = readFile('result.txt');
  expect(result).toEqual(expected);
});
