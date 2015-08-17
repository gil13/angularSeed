/**
 * storageService - Service used to store in localStorage/sessionStorage
 *
 * @module app.storage
 * @class storageService
 * @param $window Context to call native methods
 */

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

            /**
             * Use localStorage/sessionStorage to store data
             *
             * @method setData
             * @requires type, key, value
             * @return context
            */

            function setData(type, key, value) {
                if(type === 'localStorage' && ls) {
                    $window.localStorage.setItem(key, JSON.stringify(value));
                } else if (type === 'sessionStorage' && ss){
                    $window.sessionStorage.setItem(key, JSON.stringify(value));
                }
                return this;

            }

            /**
             * Retrieve from localStorage/sessionStorage data with key
             *
             * @method getData
             * @requires type, key, value
             * @return object
            */

            function getData(type, key) {
                if(type === 'localStorage' && ls) {
                    return JSON.parse($window.localStorage.getItem(key));
                } else if (type === 'sessionStorage' && ss){
                    return JSON.parse($window.sessionStorage.getItem(key));
                }
            }
        }
})();
