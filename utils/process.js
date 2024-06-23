import {Command} from 'commander';

const program = new Command();

program
    .option('-d','Variable para Debug',false)
    .option('-p <number>', 'port number for server',9080)
    .option('-mode <mode>', 'mode','production')

    program.parse();    