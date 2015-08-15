(function() {
    'use strict';

    angular
        .module('app.resource', [])
        .factory('resourceService', resourceService);

        resourceService.$inject = ['$http'];

        function resourceService($http) {
            var apiKey = '4650cae2b5b7a63743b629fdc63af7da',
                baseUrl = 'http://api.themoviedb.org/3/tv/',
                imageSize = [],
                imageUrl,
                endpoint,
                page = 1;

            var service = {
                getSeriesList: getSeriesList,
                getSerieDetail: getSerieDetail,
                getSerieImage: getSerieImage,
                getConfig: getConfig,
                getSeasons: getSeasons
            };

            return service;

            function getConfig(){
                var url =  'http://api.themoviedb.org/3/configuration' + '?api_key=' + apiKey;
                return $http.get(url)
                    .success(function(data){
                        imageUrl = data.images.base_url;
                        imageSize = data.images.backdrop_sizes;
                    });
            }

            function getSeriesList(type) {
                endpoint = type || 'popular';

                var url = baseUrl + endpoint + '?page=' + page + '&api_key=' + apiKey;
                return $http.get(url);
            }

            function getSerieDetail(id) {
                var url = baseUrl + id + '?api_key=' + apiKey;
                return $http.get(url);
            }

            function getSerieImage(image) {
                var url = imageUrl + imageSize[1] + image + '?api_key=' + apiKey;
                return url;
            }

            function getSeasons(id,season) {
                // http://api.themoviedb.org/3/tv/id/season/season_number
                var url = baseUrl + id + '/season/' + season + '?api_key=' + apiKey;
                return $http.get(url);
            }
            //     return $http.get(urlBase + '/' + id);
            // };
            //
            // this.insertCustomer = function (cust) {
            //     return $http.post(urlBase, cust);
            // };
            //
            // this.updateCustomer = function (cust) {
            //     return $http.put(urlBase + '/' + cust.ID, cust);
            // };
            //
            // this.deleteCustomer = function (id) {
            //     return $http.delete(urlBase + '/' + id);
            // };
            //
            // this.getOrders = function (id) {
            //     return $http.get(urlBase + '/' + id + '/orders');
            // };
        }
})();
