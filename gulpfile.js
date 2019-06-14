const gulp = require('gulp'); 
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const less = require('gulp-less');
const pump = require('pump') 

gulp.task('all',async function() {
  await pump([
    gulp.src('./package/style/index.less'),
    less(),
    autoprefixer({
      browsers: ['last 2 versions', 'ie > 8']
    }),
    rename('index.css'),//{'suffix':'.min'}
    gulp.dest('./dist/styles')
  ])
})
gulp.task('component',async function() {
  await pump([
    gulp.src('./package/styles/*.less'),
    less(),
    autoprefixer({
      browsers: ['last 2 versions', 'ie > 8']
    }), 
    gulp.dest('./dist/styles')
  ])
})

 
gulp.task('watch-css',async function(){
  await gulp.watch(['package/styles/*.less'],gulp.series('all','component'))
})
 

gulp.task('default',gulp.series('watch-css')) 