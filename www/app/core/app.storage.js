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
                getData: getData,
                checkData: checkData
            };

            return service;

            /**
             * Use localStorage/sessionStorage to store data
             * Security is boolean (base64 hash)
             *
             * @method setData
             * @requires type, key, value, security
             * @return context
            */

            function setData(type, key, value, security) {
                if(type === 'localStorage' && ls) {
                    if(security === true){
                        $window.localStorage.setItem(key, btoa(JSON.stringify(value)));
                    } else {
                        $window.localStorage.setItem(key, JSON.stringify(value));
                    }
                } else if (type === 'sessionStorage' && ss){
                    if(security === true){
                        $window.sessionStorage.setItem(key, btoa(JSON.stringify(value)));
                    } else {
                        $window.sessionStorage.setItem(key, JSON.stringify(value));
                    }
                } else if (type === 'cache' && ss){
                    value.timestamp = _generateTimestamp(30);
                    $window.sessionStorage.setItem(btoa(key), btoa(JSON.stringify(value)));
                }
                return this;

            }

            /**
             * Retrieve from localStorage/sessionStorage data with key
             * Security is boolean (base64 hash)
             *
             * @method getData
             * @requires type, key, value, security
             * @return object
            */

            function getData(type, key, security) {
                var result;

                if(type === 'localStorage' && ls) {
                    if(security === true){
                        result = JSON.parse(atob($window.localStorage.getItem(key)));
                    } else {
                        result = JSON.parse($window.localStorage.getItem(key));
                    }
                } else if (type === 'sessionStorage' && ss){
                    if(security === true){
                        result = JSON.parse(atob($window.sessionStorage.getItem(key)));
                    } else {
                        result = JSON.parse($window.sessionStorage.getItem(key));
                    }
                } else if (type === 'cache' && ss){
                    key = btoa(key);
                    result = JSON.parse(atob($window.sessionStorage.getItem(key)));
                }

                return result;
            }

            /**
             * Retrieve boolean if cache key exist
             *
             * @method checkData
             * @requires key
             * @return boolean
            */

            function checkData(key) {
                var data = $window.sessionStorage.getItem(key),
                    ex;

                if(data) {
                    if(_checkTimestamp(JSON.parse(atob(data)).timestamp) === false){
                        ex = true;
                    } else {
                        _removeKey(key);
                        ex = false;
                    }
                } else {
                    ex = false;
                }

                return ex;
            }

            /**
             * Generate timestamp for expiring purpouses
             *
             * @method _generateTimestamp
             * @return number
            */

            function _generateTimestamp(min) {
                var now = (new Date()).getTime(),
                    expire = 1000 * 60 * min,
                    ts = now + expire;

                return ts;
            }

            /**
             * Check if timestamp is expired
             *
             * @method _checkTimestamp
             * @requires {number} timestamp
             * @return boolean
            */

            function _checkTimestamp(ts) {
                var now = (new Date()).getTime();
                var expired;

                if(now > ts) {
                    expired = true;
                } else {
                    expired = false;
                }

                return expired;
            }

            /**
             * Remove item
             *
             * @method _removeKey
             * @requires {number} key
            */

            function _removeKey(key) {
                $window.sessionStorage.removeItem(key);
            }
        }
})();
