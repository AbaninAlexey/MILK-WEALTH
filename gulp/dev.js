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
import changed, { compareContents } from 'gulp-changed';

const { src, dest, series, parallel, watch } = gulp;
const sassCompiler = gulpSass(sass); 
const serve = browserSync.create();

function cleanDev(done) {
  if (fs.existsSync('./build/')) {
    return src('./build/', {read: false})
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

function htmlDev() {
  return src(['./src/**/*.html', '!./src/blocks/*.html'])
        .pipe(changed('./build/',{ hasChanged: compareContents }))
        .pipe(plumber(
          plumberConfig('html')
        ))
        .pipe(fileInclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(dest('./build/'));
};


function stylesDev() { 
  return src('src/styles/main.scss')
        .pipe(changed('build/styles/'))
        .pipe(plumber(
          plumberConfig('scss')
        ))
        .pipe(sourcemaps.init())
        .pipe(sassCompiler().on('error', sassCompiler.logError)) 
        .pipe(sourcemaps.write())
        .pipe(dest('build/styles/'));
};


function imagesDev() {
    return src('src/images/**/*.{jpg,jpeg,png,svg}', { encoding: false })
      .pipe(changed('build/images/'))
      // .pipe(imagemin([
      //   imageminMozjpeg({ quality: 70 }),
      //   imageminOptipng({ optimizationLevel: 5 }),
      //   imageminSvgo()
      // ], { verbose: true }))
      .pipe(dest('build/images/'));
  };

  function videosDev() {
    return src('./src/videos/*.*')
    .pipe(changed ('./build/videos/'))
    .pipe(dest('./build/videos/'));
  };

function fontsDev() {
  return src('src/fonts/**/*', { encoding: false })
    .pipe(changed('build/fonts/'))
    .pipe(dest('build/fonts/'))
};

function serverDev(done) {
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

function scriptsDev() {
  return src('./src/scripts/*.js')
    .pipe(changed('./build/scripts/'))
    .pipe(plumber(
      plumberConfig('scripts')
    ))
    .pipe(webpack(webpackConfig))
    .pipe(dest('./build/scripts/'))
}


function watcherDev() {
  watch('src/styles/**/*.scss', series(stylesDev, reload));
  watch('src/**/*.html', series(htmlDev, reload));
  watch('src/images/**/*', series(imagesDev));
  watch('src/fonts/**/*', series(fontsDev, reload));
  watch('src/scripts/**/*', series(scriptsDev, reload));
  watch('src/videos/**/*', series(videosDev, reload));
};



export {cleanDev, 
        watcherDev, 
        scriptsDev, 
        serverDev, 
        fontsDev, 
        imagesDev, 
        stylesDev, 
        htmlDev, 
        plumberConfig,
        reload,
        videosDev
     }