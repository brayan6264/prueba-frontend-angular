const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const fs = require('fs');

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const envVars = Object.keys(process.env)
  .filter(k => k.startsWith('NG_APP_'))
  .map(k => `export const ${k} = '${process.env[k]}';`)
  .join('\n');

// Asegura que siempre sea un módulo válido
const finalOutput = envVars || '// No env vars found\nexport {};';

fs.mkdirSync('./src/environments', { recursive: true });
fs.writeFileSync('./src/environments/environment.generated.ts', finalOutput);

