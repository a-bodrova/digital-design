const gulp = require('gulp');
const sass = require('sass');
const gulpSass = require('gulp-sass');
const babel = require('gulp-babel');
const gulpConcat = require('gulp-concat');
const del = require('del');

const scssCompiler = gulpSass(sass);

const clean = () => {
  return del('./dist/');
}

const copyIcons = () => {
  return gulp.src('./src/assets/images/svg/*.*')
    .pipe(gulp.dest('./dist/assets/svg/'))
}

const copyImages = () => {
  return gulp.src('./src/assets/images/jpg/*.*')
    .pipe(gulp.dest('./dist/assets/jpg/'))
}

gulp.task('clean', clean);

gulp.task('js', () => {
  return gulp.src('./src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(gulpConcat('index.js'))
    .pipe(gulp.dest('./dist/js'));
})

gulp.task('styles', () => {
  return gulp.src('./src/assets/sass/**/*.scss')
      .pipe(scssCompiler().on('error', scssCompiler.logError))
      .pipe(gulp.dest('./dist/css'));
});

gulp.task('copyIcons', copyIcons);

gulp.task('copyImages', copyImages);

gulp.task('html', ()=> {
  return gulp.src('./*.html')
         .pipe(gulp.dest('./dist/'))
});

gulp.task('watch', () => {
  return gulp.watch('./src/**/**',
         gulp.series('clean', 'html', 'styles', 'js', 'copyIcons', 'copyImages'));
});