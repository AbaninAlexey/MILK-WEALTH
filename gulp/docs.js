import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import gulpSass from 'gulp-sass';
import browserSync  from 'browser-sync';
import clean from 'gulp-clean';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from 'webpack-stream';
import webpackConfig from '../webpack.config.js';
import * as sass from 'sass'
import * as fs from 'fs';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminSvgo from 'imagemin-svgo';
import changed  from 'gulp-changed';
import prefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import htmlClean from 'gulp-htmlclean';

const { src, dest, series, parallel, watch } = gulp;
const sassCompiler = gulpSass(sass); 
const serve = browserSync.create();

function cleanDocs(done) {
  if (fs.existsSync('./docs/')) {
    return src('./docs/', {read: false})
    .pipe(clean());
  }
  done();
};


const plumberConfig = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: 'Error <%= error.message %>',
      sound: false  
    })
  }
}

function htmlDocs() {
  return src(['./src/**/*.html', '!./src/blocks/*.html'])
        .pipe(changed ('./docs/'))
        .pipe(plumber(
          plumberConfig('html')
        ))
        .pipe(fileInclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(htmlClean())
        .pipe(dest('./docs/'));
};


function stylesDocs() { 
  return src('./src/styles/main.scss')
        .pipe(changed ('./docs/styles'))
        .pipe(plumber(
          plumberConfig('scss')
        ))
        .pipe(sourcemaps.init())
        .pipe(prefixer({
          cascade: false
        }))
        .pipe(sassCompiler().on('error', sassCompiler.logError)) 
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(dest('./docs/styles'));
};


function imagesDocs() {
    return src('./src/images/**/*.{jpg,jpeg,png,svg}', { encoding: false })
      .pipe(changed ('./docs/images/'))
      .pipe(imagemin([
        imageminMozjpeg({ quality: 70 }),
        imageminOptipng({ optimizationLevel: 5 }),
        imageminSvgo()
      ], { verbose: true }))
      .pipe(dest('./docs/images/'));
  };

function videosDocs() {
  return src('./src/videos/*')
  .pipe(changed ('./docs/videos/'))
  .pipe(dest('./docs/videos/'));
};

function fontsDocs() {
  return src('./src/fonts/**/*', { encoding: false })
    .pipe(changed ('./docs/fonts/'))
    .pipe(dest('./docs/fonts/'))
};

function serverDocs(done) {
    serve.init({
      server: {baseDir: ["build/html", "build"] },
      files: "*.html",
      open: true,
      notify: false
    });
    done(); 
  }

  function reload(done) {
    serve.reload();
    done();
  }

function scriptsDocs() {
  return src('./src/scripts/*.js')
    .pipe(changed ('./docs/scripts/'))
    .pipe(plumber(
      plumberConfig('scripts')
    ))
    .pipe(webpack(webpackConfig))
    .pipe(dest('./docs/scripts/'))
}

export {cleanDocs, 
        scriptsDocs, 
        serverDocs, 
        fontsDocs, 
        imagesDocs, 
        stylesDocs, 
        htmlDocs, 
        plumberConfig,
        videosDocs
     }