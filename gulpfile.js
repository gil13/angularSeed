// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    minifyCss = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    eslint = require('gulp-eslint'),
    htmlreplace = require('gulp-html-replace'),
    environments = require('gulp-environments'),
    del = require('del'),
    friendlyFormatter = require('eslint-friendly-formatter');

//Set environments
var development = environments.development;
var production = environments.production;

// Webserver
gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('replace', ['cleanDist'], function() {
    gulp.src('www/index.html')
        .pipe(development(htmlreplace({
            // 'css': 'styles.min.css',
            'core': 'js/core/core.js',
            'js': 'js/feature/feature.js',
            'vendors': 'js/vendors/vendors.js'
        }))
        .pipe(production(htmlreplace({
            // 'css': 'styles.min.css',
            'core': 'js/core/core.min.js',
            'js': 'js/feature/feature.min.js',
            'vendors': 'js/vendors/vendors.min.js'
        }))))
        .pipe(gulp.dest('dist/'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

// Concatenate coreJs
gulp.task('coreJs', ['cleanDist'], function() {
    return gulp.src('www/app/core/*.js')
        .pipe(concat('core.js'))
        .pipe(production(rename('core.min.js')))
        .pipe(production(uglify()))
        .pipe(gulp.dest('dist/js/core'))
        .pipe(livereload());
});

// Concatenate featureJs
gulp.task('featureJs', ['cleanDist'], function() {
    return gulp.src(['www/app/**/*.js', '!www/app/core/*.js'])
        .pipe(concat('feature.js'))
        .pipe(production(rename('feature.min.js')))
        .pipe(production(uglify()))
        .pipe(gulp.dest('dist/js/feature'))
        .pipe(livereload());
});

// Concatenate vendors
gulp.task('vendors', ['cleanDist'], function() {
    return gulp.src(['node_modules/angular/angular.min.js', 'node_modules/angular-ui-router/build/angular-ui-router.min.js'])
        .pipe(concat('vendors.js'))
        .pipe(production(rename('vendors.min.js')))
        .pipe(production(uglify()))
        .pipe(gulp.dest('dist/js/vendors'))
        .pipe(livereload());
});

// Clean dist folder
gulp.task('cleanDist', function(cb) {
    del(['dist'], {force: true}, cb);
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('www/app/**/*.js', ['lint']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Lint Task
gulp.task('lint', function () {
    return gulp.src(['www/app/**/*.js'])
        .pipe(eslint('.eslintrc'))
        .pipe(eslint.format(friendlyFormatter))
        .pipe(eslint.failOnError());
});

// Default Task
gulp.task('linter', ['lint']);

gulp.task('serve', ['webserver']);

gulp.task('build', ['webserver', 'lint', 'cleanDist', 'coreJs', 'featureJs', 'vendors', 'replace', 'watch']);
