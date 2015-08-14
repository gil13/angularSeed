(function(){
    'use strict';

    angular
        .module('seed', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/actors');

            $stateProvider
                .state('/', {
                    url:'/actors',
                    templateUrl: 'app/actors/actors.html'
                    // controller: 'HomeController'
                });
        }]);
})();
