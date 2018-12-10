var gulp = require('gulp');
var uglify = require('gulp-uglify');//压缩js
var concat = require('gulp-concat');//合并
const babel = require('gulp-babel');//将ES6转为ES5
var rev = require('gulp-rev'); //生成哈希后缀
var rename = require('gulp-rename'); // 修改文件名
var connect = require('gulp-connect'); //服务器
var watch = require('gulp-watch');
var sass = require('gulp-sass')


gulp.task('minijs', function () {
  // 将你的默认的任务代码放在这
  gulp.src('tianmao/app/js/a.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})
gulp.task('hebing', function () {
  // 将你的默认的任务代码放在这
  gulp.src('tianmao/app/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
})
gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    port: '7777',
    livereload: true
  });
});
gulp.task('stream', function () {
  return watch('css/**/*.css', { ignoreInitial: false })
    .pipe(gulp.dest('build'));
});