import gulp from 'gulp';
const {series, parallel} = gulp;

import { htmlDev, stylesDev, scriptsDev, cleanDev, imagesDev, fontsDev, serverDev, watcherDev, videosDev } from './gulp/dev.js';
import { htmlDocs, stylesDocs, scriptsDocs, cleanDocs, imagesDocs, fontsDocs, serverDocs, videosDocs } from './gulp/docs.js';

export const docs = series(
  cleanDocs, 
  parallel(htmlDocs, stylesDocs, imagesDocs, fontsDocs, scriptsDocs, videosDocs),
  parallel(serverDocs)
);


export default series(
  cleanDev, 
  parallel(htmlDev, stylesDev, imagesDev, fontsDev, scriptsDev, videosDev),
  parallel( watcherDev, serverDev),
);
