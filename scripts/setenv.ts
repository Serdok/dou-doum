const fs = require('fs');
const path = require('path');
const {argv} = require('yargs');

require('dotenv').config();

const environment = argv.environment;
const isProduction = environment === 'prod';

const environmentFileContents = `
export const environment = {
  firebase: {
    projectId: 'dou-doum',
    appId: '1:68465041503:web:e3f0c54dde23f9416d3bea',
    storageBucket: 'dou-doum.appspot.com',
    apiKey: 'AIzaSyAx2wBByuARIzlI-nGfeMFSIj2a5fgn6NE',
    authDomain: 'dou-doum.firebaseapp.com',
    messagingSenderId: '68465041503',
    measurementId: 'G-M6LLYJJS52',
  },
  imdb: {
    apiKeys: {
      v3: '${process.env["IMDB_API_KEY_V3"]}',
      v4: '${process.env["IMDB_API_KEY_V4"]}'
    },
  },
  production: ${isProduction}
};
`

const writeFile = async (file: typeof fs.PathLike, contents: any, options?: typeof fs.WriteFileOptions) => {
  if (!fs.existsSync(path.dirname(file))) {
    await fs.promises.mkdir(path.dirname(file), {recursive: true});
  }
  fs.writeFileSync(file, contents, options);
}

let targetPath = `./src/environments/environment.ts`
writeFile(targetPath, environmentFileContents, {flag: 'w'}).then(() => {
  console.log(`Written environment variables to ${targetPath}`);
}).catch(console.error);

targetPath = `./src/environments/environment.prod.ts`
writeFile(targetPath, environmentFileContents, {flag: 'w'}).then(() => {
  console.log(`Written environment variables to ${targetPath}`);
}).catch(console.error);
