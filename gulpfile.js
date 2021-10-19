const gulp = require('gulp');

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('compress', done => {

    gulp.src('bystr-sort/*.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.extname = `.min${path.extname}`;
      }))
    .pipe(gulp.dest('./bystr-sort/dist'));

    done();
});