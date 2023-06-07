import app from './app';
import { load } from 'ts-dotenv';
import chalk from 'chalk';
import { mongoConnection } from './database';

const env = load({
  PORT: Number,
});

mongoConnection()
  .then(() => {
    console.log(`Database connection ${chalk.green('✔')}`);
  })
  .catch((e: Error) => {
    console.log(`Database connection ${chalk.green('x')} | Error: ${e.message}`);
  });

app
  .listen(env.PORT)
  .on('listening', () => console.log(`Listening on port ${chalk.green(env.PORT)}`))
  .on('error', (e) => {
    console.log(chalk.red((e as Error).message));
  });
