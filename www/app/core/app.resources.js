/**
 * resourceService - Store web API to use in app
 *
 * @module app.resource
 * @class resourceService
 * @param $http Service to call services
 */

(function() {
    'use strict';

    angular
        .module('app.resource', [])
        .factory('resourceService', resourceService);

        resourceService.$inject = ['$http', '$q', 'storageService'];

        function resourceService($http, $q, storageService) {
            var apiKey = '4650cae2b5b7a63743b629fdc63af7da',
                baseUrl = 'http://api.themoviedb.org/3/tv/',
                def = $q.defer(),
                result,
                posterSize = [],
                coverSize = [],
                imageUrl,
                img,
                endpoint,
                page = 1;

            var service = {
                getSeriesList: getSeriesList,
                getSerieDetail: getSerieDetail,
                getSerieImage: getSerieImage,
                getConfig: getConfig,
                getSeasons: getSeasons,
                getEpisodeDetail: getEpisodeDetail,
                getEpisodeCast: getEpisodeCast
            };

            return service;

            /**
             * Retrieve config detail from server and store it
             *
             * @method getConfig
            */

            function getConfig(){
                var url =  'http://api.themoviedb.org/3/configuration' + '?api_key=' + apiKey;

                if (storageService.checkData(btoa(url))) {
                    result = storageService.getData('cache', url);
                    _setImageData(result);
                    def.resolve(result);
                } else {
                    if(_checkConexion()) {
                        $http.get(url)
                            .success(function(data){
                                storageService.setData('cache', url, data);
                                _setImageData(data);
                                def.resolve(data);
                            });
                    }
                }

                return def.promise;
            }

            /**
             * Retrieve TV series list from server
             *
             * @method getSeriesList
             * @requires type - Optional
             * @return Promise - service response
            */

            function getSeriesList(type) {
                endpoint = type || 'popular';
                var url = baseUrl + endpoint + '?page=' + page + '&api_key=' + apiKey;

                if(_checkConexion()) {
                    return $http.get(url);
                }
            }

            /**
             * Retrieve TV serie detail from server
             *
             * @method getSerieDetail
             * @requires id
             * @return Promise - service response
            */

            function getSerieDetail(id) {
                var url = baseUrl + id + '?api_key=' + apiKey;

                if(_checkConexion()) {
                    return $http.get(url);
                }
            }

            /**
             * Retrieve TV serie image from server
             *
             * @method getSerieDetail
             * @requires image
             * @return String - image url
            */

            function getSerieImage(image, type) {
                if(type === 'poster'){
                    img = posterSize[2];
                } else if (type === 'cover'){
                    img = coverSize[1];
                }
                var url = imageUrl + img + image + '?api_key=' + apiKey;
                return url;
            }

            /**
             * Retrieve TV serie seasons from server
             *
             * @method getSeasons
             * @requires id, season
             * @return Promise - service response
            */

            function getSeasons(id, season) {
                var url = baseUrl + id + '/season/' + season + '?api_key=' + apiKey;

                if(_checkConexion()) {
                    return $http.get(url);
                }
            }

            /**
             * Retrieve episode details from server
             *
             * @method getEpisodeDetail
             * @requires id, season, episode
             * @return Promise - service response
            */

            function getEpisodeDetail(id, season, episode) {
                var url = baseUrl + id + '/season/' + season + '/episode/' + episode + '?api_key=' + apiKey;

                if(_checkConexion()) {
                    return $http.get(url);
                }
            }

            /**
             * Retrieve TV serie casting details from server
             *
             * @method getEpisodeCast
             * @requires id, season, episode
             * @return Promise - service response
            */

            function getEpisodeCast(id) {
                var url = baseUrl + id + '/credits' + '?api_key=' + apiKey;

                if(_checkConexion()) {
                    return $http.get(url);
                }
            }

            /**
             * Private method to set images paths
             *
             * @method _setImageData
            */

            function _setImageData(data){
                imageUrl = data.images.base_url;
                posterSize = data.images.poster_sizes;
                coverSize = data.images.backdrop_sizes;
            }

            /**
             * Provite method to check browser conexion
             *
             * @method _checkConexion
            */

            function _checkConexion(){
                var ex = navigator.onLine ? true : false;
                return ex;
            }
        }
})();
