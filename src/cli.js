import program from 'commander';
import genDiff from './index';

const startCliUtil = () => {
  program
    .version('0.0.1')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(genDiff(firstConfig, secondConfig, program.format));
    })
    .option('-f, --format <format>', 'output format', 'default');
  program.description('Compares two configuration files and shows a difference.');
  program.parse(process.argv);
};

export default startCliUtil;
