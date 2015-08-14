(function() {
    'use strict';

    angular
        .module('seed.main',['ui.router', 'seed', 'ngResource'])
        .controller('MainCtrl', MainCtrl);

        MainCtrl.$inject = ['$scope', 'ngResource'];

        function MainCtrl($scope, Actors) {
            var vm = this;
            vm.title = 'testiiiiiiing';

            Actors.query(function(data) {
                console.log(data);
                vm.posts = data;
            });

        }
})();
