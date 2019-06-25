import { config as dev } from './environments.dev';
import { config as development } from './environments.development';
import { config as production } from './environments.production';
import { config as qa } from './environments.qa';

console.log(`%cenvironments => ${process.env.REACT_APP_API}`, 'color: red; font-style: italic;');

interface EnvironmentsInterface {
  authApi: string;
  mallApi: string;
  env: string;
}

export const environments: EnvironmentsInterface = [dev, development, production, qa].filter((c) => c.env === process.env.REACT_APP_API)[0];
