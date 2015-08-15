(function(){
    'use strict';

    angular
        .module('app.storage', [])
        .factory('storageService', storageService);

        storageService.$inject = ['$window'];

        function storageService($window) {
            var ls = $window.localStorage ? true : false;
            var ss = $window.sessionStorage ? true : false;

            var service = {
                setData: setData,
                getData: getData
            };

            return service;

            function setData(type, key, value) {
                if(type === 'localStorage' && ls) {
                    $window.localStorage.setItem(key, JSON.stringify(value));
                } else if (type === 'sessionStorage' && ss){
                    $window.sessionStorage.setItem(key, JSON.stringify(value));
                }
                return this;

            }

            function getData(type, key) {
                if(type === 'localStorage' && ls) {
                    return JSON.parse($window.localStorage.getItem(key));
                } else if (type === 'sessionStorage' && ss){
                    return JSON.parse($window.sessionStorage.getItem(key));
                }
            }
        }
})();
