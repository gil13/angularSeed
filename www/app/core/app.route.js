(function(){
    'use strict';

    angular
        .module('seed', ['ui.router', 'seed.main'])
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/main');

            $stateProvider
                .state('/', {
                    url:'/main',
                    templateUrl: 'app/main/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'vm'
                });
        }]);
})();
