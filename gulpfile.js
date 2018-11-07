const gulp              = require('gulp');
const path 				= require('path');
const pretty            = require('gulp-pretty');
const prettier_config    = require("./prettier.config");
const ts                = require('gulp-typescript');
const uglify            = require('gulp-uglify');
const rename            = require('gulp-rename');
const browserify        = require('gulp-browserify');
const clean             = require('gulp-clean-old');


const typescript_src        = path.join(__dirname,'!(node_modules)/**/*.ts');
const format_script_dest    = path.join(__dirname,'./');
const cache_path            = path.join(__dirname,'cache');
const optput_path           = path.join(__dirname,'dist');
const cache_src_html        = path.join(__dirname,'cache/**/match_three_game.js');

gulp.task('format', function() {
    return gulp.src(typescript_src)
        .pipe(pretty(prettier_config))
        .pipe(gulp.dest(format_script_dest));
});

gulp.task('clean_cache',function(){
    return gulp.src( cache_path + '/**/*', {
            read : false
        })
        .pipe(clean());
});
gulp.task('clean_dist',function(){
    return gulp.src( optput_path + '/**/*', {
            read : false
        })
        .pipe(clean());
});

gulp.task('clean',  gulp.parallel(
    'clean_cache' ,
    'clean_dist'
));

gulp.task('cmd_complied', function() {
    return gulp.src( typescript_src )
        .pipe(ts({
            noImplicitAny: true,
            module : "commonjs",
        }))
        .pipe(gulp.dest(cache_path));
});

gulp.task('cmd_link_html',function() {
    return gulp.src(cache_src_html)
        .pipe(browserify({
            insertGlobals : false,
        }))
        .pipe(gulp.dest(optput_path))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(optput_path));
});

gulp.task('build', gulp.series(
    // 'clean',
    "cmd_complied",
    gulp.parallel( 'cmd_link_html' )
))
