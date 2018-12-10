var gulp = require('gulp');
var uglify = require('gulp-uglify');//压缩js
var concat = require('gulp-concat');//合并
const babel = require('gulp-babel');//将ES6转为ES5
var rev = require('gulp-rev'); //生成哈希后缀
var rename = require('gulp-rename'); // 修改文件名
var connect = require('gulp-connect'); //服务器
var watch = require('gulp-watch');
const htmlmin = require('gulp-htmlmin');//压缩HTML
var csso = require('gulp-csso');//压缩css
const imagemin = require('gulp-imagemin'); //压缩图片
var sass = require('gulp-sass');  //sass 转css
sass.compiler = require('node-sass');

gulp.task('minijs', function() {   //压缩js
  // 将你的默认的任务代码放在这
  gulp.src('tianmao/app/**/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/static'))
})
gulp.task('hebing', function() {   //合并js
    // 将你的默认的任务代码放在这
    gulp.src('tianmao/app/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
  })
  gulp.task('connect',function(){  //打开服务器
    connect.server({
      root:'dist',
      port: '7777',
      livereload:true
    });
  });
gulp.task('stream', function () {
    return watch('css/**/*.css', { ignoreInitial: false })
        .pipe(gulp.dest('build'));
});

gulp.task('minihtml', function () {//压缩html
  gulp.src('tianmao/app/**/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'));
});

gulp.task('minicss', function () {//压缩css
  gulp.src('tianmao/app/static/css/*.css')
      .pipe(csso())
      .pipe(gulp.dest('dist/static/css'))
});

gulp.task('miniimg', function () {//压缩图片
  gulp.src('tianmao/app/static/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/static/images'))
});


gulp.task('sass', function () {    //sass转化
  return gulp.src('tianmao/app/static/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/static/css'));
});
