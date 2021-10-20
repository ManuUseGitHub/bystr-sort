const gulp = require('gulp');

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const moduleName = /^.+\/(.+)$/.exec(process.env.PWD)[1];
gulp.task('compress', done => {

    gulp.src(`./${moduleName}/*.js`)
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.extname = `.min${path.extname}`;
      }))
    .pipe(gulp.dest(`./${moduleName}/dist`));

    done();
});