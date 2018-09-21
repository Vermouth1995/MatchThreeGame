const gulp              = require('gulp');
const path 				= require('path');
const pretty            = require('gulp-pretty');
const prettierconfig 	= require("./prettier.config");

const scriptsrc 		= path.join(__dirname,'./**/*.ts');
const scriptdest 		= path.join(__dirname,'./');

gulp.task('format', function() {
    return gulp.src(scriptsrc)
        .pipe(pretty(prettierconfig))
        .pipe(gulp.dest(scriptdest));
});
