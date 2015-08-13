(function(){
    'use strict';

    angular
        .module('seed', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/main');

            $stateProvider
                .state('/', {
                    url:'/main',
                    templateUrl: 'app/main/main.html'
                    // controller: 'HomeController'
                });
        }]);
})();
