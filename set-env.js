// set-env.js
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const fs = require('fs');

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

// Filtra solo variables que empiezan con NG_APP_
const envVars = Object.keys(process.env)
  .filter(k => k.startsWith('NG_APP_'))
  .map(k => `export const ${k} = '${process.env[k]}';`)
  .join('\n');

// Escribe las variables como un archivo TypeScript
fs.writeFileSync('./src/environments/environment.generated.ts', envVars);
