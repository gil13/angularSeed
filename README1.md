# AngularJs - TV series

Updated: 2015-08-18

**Please read the CHANGELOG.md file.**

## Overview

  * [gulpfile.js](#gulpfile-structure)
  * [package.json] (#npm-dependencies)
  * [Core] (#app-core)
  * [Common] (#app-common)
  * [API] (#api)

## Gulpfile structure

    * sass: Sass processor
    * concat: Concat files to unify
    * uglify: Minify files
    * rename: Rename files
    * livereload: Reload gulp task when code change
    * connect: Library used to set up a webserver
    * eslint: Check quality and code sintaxt
    * htmlreplace: Replace css and js in html files
    * environments: Used to pass environments as arguments
    * del: Allow clean/remove files and folders
    * gulp-s3: Allows you to deploy your build data to Amazon S3
    * yuidoc: Generates auto documentacion
    * friendlyFormatter: Give a friendly output for eslint report

    * Tasks

    * webserver: Set up a webserver in dist folder using localhost and 8080 port
    * templateHtml: copy all html templates to ist folder
    * replace: Insert in index.html css (styles) and js (vendors, features and core) according to environment
    * coreJs - vendors - featureJs: concat JS files and minify if environment is 'production'
    * translation: copy all JSON files with translations to build folder
    * cleandist: clean 'dist' folder before each compilation
    * watch: wait expecting any code changes to rerun a task
    * lint: execute 'eslint' test in all .js files
    * deployS3: Using a S3 config file upload it to the platform
    * jsDoc: Using Yuidoc and code comments generates documentacion

    * Gulp params

    * serve: just setup 'webserver'
    * linter: execute 'eslint'
    * deploy: execute 'deployS3'
    * deploy: execute 'jsDoc'
    * build: run ['webserver', 'lint', 'cleanDist', 'coreJs', 'featureJs', 'vendors', 'replace', 'watch']
        - As arguments --> '--env' with 'production' or 'development'
        
## NPM Dependencies
 
    * angular: angularJs core
    * angular-translate: module which allows to use template translations
    * angular-translate-loader-static-files: module which allows to use JSON file as translation source
    * angular-translate-loader-url: module which allows to use url as translation file
    * angular-ui-router: alternative router for angular
    * angular-ui-router-stathelper: allow to use partials and nested routes easily
    * bower: package manager use for some libs
    * del: allows you to delete folder/files in gulp
    * eslint-friendly-formatter": eslint terminal report formatter
    * eslint-html-reporter": javascript code quality and syntax error detection
    * gulp: task automation
    * gulp-concat: gulp-module to concant/join files
    * gulp-connect: gulp-module to set up webserver
    * gulp-duration: gulp-module to get execution timing
    * gulp-environments: gulp-module whicj allows use environment as params
    * gulp-eslint: gulp-module to allow eslint task
    * gulp-html-replace: gulp-module for replace code lines in html
    * gulp-jasmine: gulp-module for jasmin unit testing
    * gulp-karma: gulp-module for karma
    * gulp-karma-runner: gulp-module for karma taks in real browser
    * gulp-livereload: gulp-module for browser livereload
    * gulp-rename: gulp-module for renaming files/folders
    * gulp-s3: gulp-module for deploying to amazon s3
    * gulp-sass: gulp-module to process sass files
    * gulp-uglify: gulp-module for minification task in files
    * gulp-yuidoc: Automatic doc generator
    * jasmine-reporters: Create a jasmine report for unit-testing
    * karma: test runner
    * restangular: alternative for server request in angular
    * underscore: Javascript library
    
## App CORE

    * app.config.js: Initialize resources on init
        ** Fastclick lib
        
    *  app.resources.js: Store and register web service request
        ** getSeriesList():  Retrieve TV series list from server
        ** getSerieDetail(): Retrieve TV serie detail from server
        ** getSerieImage(): Retrieve TV serie image from server
        ** getConfig(): Retrieve config detail from server and store it
        ** getSeasons(): Retrieve TV serie seasons from server
        ** getEpisodeDetail(): Retrieve episode details from server
        ** getEpisodeCast(): Retrieve TV serie casting details from server
        ** _checkConexion(): Check if browser is connected
        ** _setImageData(): Set image paths
        
    * app.route.js: Main router file
        url:'/series'
        templateUrl: 'app/series/series.html'
        controller: 'SeriesCrtl'

        url:'/detail'
        templateUrl: 'app/series/detail.html'
        controller: 'DetailCrtl'

        url:'/chapter'
        templateUrl: 'app/series/chapter.html'
        controller: 'ChapterCrtl'
        
    * app.storage.js: Servie to store and retrieve data
        ** getData(): get data from localStorage/sessionStorage
        ** setData(): set data to localStorage/sessionStorage
        ** checkData(): check data for cached service request
        ** _generateTimestamp(): generate custom timeStamp
        ** _checkTimeStamp(): check timestamp with actual date
        ** _removeKey(): remove item
        
    * app.translate.app: Allow to use translation service in template
    
## App Common

    * Common templates as headers, footers, menus etc
    * Tranlastion JSON files with app strings
    
## API

    * API webservice provided by 'themoviedb'
        ** Requisites
        
        ** You need a 'key' to use this API, you should be a registrer user to use
        ** To get images url is mandatory to call 'config' service to retrieve a customized path (you need to concat paths)
        ** Live online documentation http://docs.themoviedb.apiary.io/
