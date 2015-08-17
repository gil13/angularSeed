# AngularJs - Seed

Updated: 2015-08-13

**Please read the CHANGELOG.md file.**

## Overview

  * [Gulpfile.js](#estructura-de-gulp)

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
    * friendlyFormatter: Give a friendly output for eslint report

    * Tasks

    * webserver: Set up a webserver in dist folder using localhost and 8080 port
    * replace: Insert in index.html css (styles) and js (vendors, features and core) according to environment
    * coreJs - vendors - featureJs: concat JS files and minify if environment is 'production'
    * cleandist: clean 'dist' folder before each compilation
    * watch: wait expecting any code changes to rerun a task
    * lint: execute 'eslint' test in all .js files

    * Gulp params

    * serve: just setup webserver
    * linter: execute eslint
    * build: run ['webserver', 'lint', 'cleanDist', 'coreJs', 'featureJs', 'vendors', 'replace', 'watch']
        - As arguments --> '--env' with 'production' or 'development'



FIRST LIST RESOURCE FROM http://docs.themoviedb.apiary.io/#reference/tv/tvairingtoday
