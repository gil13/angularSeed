// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
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

var vendors = [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/build/angular-ui-router.min.js',
    'node_modules/angular-ui-router.statehelper.statehelper.min.js',
    'node_modules/restangular/dist/restangular.min.js',
    'node_modules/angular-translate/dist/angular-translate.min.js',
    'node_modules/angular-translate-loader-url/angular-translate-loader-url.min.js',
    'node_modules/angular-translate-loader-url/angular-translate-loader-static-files.min.js',
    'node_modules/fastclick/fastclick.min.js',
    'node_modules/underscore/underscore-min.js'
];

var css = [
    'www/assets/css/main.css'
];

// Webserver
gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('replace', ['cleanDist', 'vendors', 'coreJs' ,'featureJs', 'templateHtml'], function() {
    gulp.src('www/index.html')
        .pipe(development(htmlreplace({
            'css': 'assets/css/main.css',
            'core': 'app/core/core.js',
            'vendors': 'js/vendors/vendors.min.js'
        }))
        .pipe(production(htmlreplace({
            'css': 'assets/css/main.css',
            'core': 'app/core/core.min.js',
            'js': 'app/series/series.controller.js',
            'vendors': 'js/vendors/vendors.min.js'
        }))))
        .pipe(gulp.dest('dist/'));
});

// Copy HTML templates
gulp.task('templateHtml', ['cleanDist'], function() {
    gulp.src('www/app/**/*.html')
        .pipe(gulp.dest('dist/app'));
});

gulp.task('css', ['cleanDist'], function() {
    gulp.src(css)
        .pipe(gulp.dest('dist/assets/css'));
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
        .pipe(gulp.dest('dist/app/core'))
        .pipe(livereload());
});

// Concatenate featureJs
gulp.task('featureJs', ['cleanDist'], function() {
    return gulp.src(['www/app/**/*.js', '!www/app/core/*.js'])
        .pipe(gulp.dest('dist/app'))
        .pipe(livereload());
});

gulp.task('translation', ['cleanDist'], function() {
    return gulp.src('www/app/common/**/*.json')
        .pipe(gulp.dest('dist/app/common'))
        .pipe(livereload());
});

// Concatenate vendors
gulp.task('vendors', ['cleanDist'], function() {
    return gulp.src(vendors)
        .pipe(concat('vendors.min.js'))
        .pipe(gulp.dest('dist/js/vendors/'))
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

// Task
gulp.task('linter', ['lint']);
gulp.task('serve', ['webserver']);
gulp.task('build', ['webserver', 'cleanDist', 'css', 'vendors', 'coreJs', 'featureJs', 'translation', 'templateHtml', 'replace']);
