// set-env.js
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const fs = require('fs');
const path = require('path');

// Carga y expande variables de entorno
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

// Filtra solo variables que empiezan con NG_APP_
const envVars = Object.keys(process.env)
  .filter(k => k.startsWith('NG_APP_'))
  .map(k => `export const ${k} = '${process.env[k]}';`)
  .join('\n');

// Asegura que el directorio src/environments exista
const envDir = path.resolve(__dirname, 'src/environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Escribe las variables como archivo TypeScript
fs.writeFileSync('./src/environments/environment.generated.ts', envVars);

