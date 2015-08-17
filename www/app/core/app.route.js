/**
 * Main router module
 *
 * @module app
 * @class router
 * @requires ui.router, app.series
 * @param $stateProvider
 * @param $urlRouterProvider
 */

(function(){
    'use strict';

    angular
        .module('app', ['ui.router', 'app.series'])
        .config(router);

        router.$inject = ['$stateProvider', '$urlRouterProvider'];

        function router($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/series');

            $stateProvider
                .state('series', {
                    url:'/series',
                    templateUrl: 'app/series/series.html',
                    controller: 'SeriesCrtl',
                    controllerAs: 'vm'
                })
                .state('detail', {
                    url:'/detail',
                    templateUrl: 'app/series/detail.html',
                    controller: 'DetailCrtl',
                    controllerAs: 'vm'
                })
                .state('chapter', {
                    url:'/chapter',
                    templateUrl: 'app/series/chapter.html',
                    controller: 'ChapterCrtl',
                    controllerAs: 'vm'
                });
        }
})();
