(function(){
    'use strict';

    angular
        .module('seed', ['ngResource'])
        .factory('Actors', function($resource) {
            return $resource('http://test.gotouche.com/rest/actors');
        });

})();
