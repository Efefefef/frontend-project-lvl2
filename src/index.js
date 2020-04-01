import program from 'commander';

const startUtil = () => {
  program
    .version('0.0.1')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(firstConfig, secondConfig);
    })
    .option('-f, --format <format>', 'output format');
  program.description('Compares two configuration files and shows a difference.');
  program.parse(process.argv);
};

export default startUtil;
