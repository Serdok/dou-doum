const {writeFile} = require('fs');
const {argv} = require('yargs');

require('dotenv').config();

const environment = argv.environment;
const isProduction = environment === 'prod';

const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`

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

writeFile(targetPath, environmentFileContents, function (err: (NodeJS.ErrnoException | null)) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Written environment variables to ${targetPath}`);
})
