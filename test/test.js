import genDiff from '../src';

test('before -> after', () => {
  const expectedResult = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  + verbose: true
  - proxy: 123.234.53.22
  - follow: false
}`;
  const result = genDiff('./test/fixtures/before.json', './test/fixtures/after.json');
  expect(result).toEqual(expectedResult);
});
