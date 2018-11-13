const gulp                  = require('gulp');
const path 				    = require('path');
const pretty                = require('gulp-pretty');
const prettier_config       = require("./prettier.config");
const ts                    = require('gulp-typescript');
const uglify                = require('gulp-uglify');
const rename                = require('gulp-rename');
const browserify            = require('gulp-browserify');
const clean                 = require('gulp-clean-old');

const cache_path            = path.join(__dirname,'cache');
const optput_path           = path.join(__dirname,'dist');
const resource_path         = path.join(__dirname,'resource');
const main_path             = path.join(__dirname,'main');

const typescript_src        = path.join(__dirname,'!(node_modules)/**/*.ts');
const format_script_dist    = path.join(__dirname,'./');

const build_src_html        = path.join(__dirname,'cache/main/html/match_three_game.js');
const build_dist_html       = path.join(__dirname,'dist/main/html');

const copy_src_html         = path.join(__dirname,'main/html/MatchThreeGame.html');
const copy_dist_html        = build_dist_html

const copy_src_resource     = path.join(resource_path,'**/*');
const copy_dist_resource    = path.join(optput_path,'resource');

gulp.task('format', function() {
    return gulp.src(typescript_src)
        .pipe(pretty(prettier_config))
        .pipe(gulp.dest(format_script_dist));
});

gulp.task('copy_html',function(){
    return gulp.src( copy_src_html, {})
        .pipe(gulp.dest(copy_dist_html));
});

gulp.task('copy_resource',function(){
    return gulp.src( copy_src_resource, {})
        .pipe(gulp.dest(copy_dist_resource));
});

gulp.task('copy',  gulp.parallel(
    'copy_html',
    'copy_resource'
));

gulp.task('clean_cache',function(){
    return gulp.src( cache_path+"/*", {
            read : false
        })
        .pipe(clean());
});
gulp.task('clean_dist',function(){
    return gulp.src( optput_path+"/*", {
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
    return gulp.src(build_src_html)
        .pipe(browserify({
            insertGlobals : false,
        }))
        .pipe(gulp.dest(build_dist_html))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(build_dist_html));
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel(
        'copy',
        gulp.series(
            "cmd_complied",
            gulp.parallel(
                'cmd_link_html'
            )
        )
    )
));
