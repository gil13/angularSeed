(function(){
    'use strict';

    angular
        .module('seed', [])
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/app/main');

            $stateProvider
                .state('main', {
                    url:'/main',
                    templateUrl: 'app/main/main.html'
                    // controller: 'HomeController'
                });
        });
})();
