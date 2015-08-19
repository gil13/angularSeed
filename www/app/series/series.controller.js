/**
 * SeriesCrtl - Used with series/series.html template
 *
 * @module app.series
 * @class SeriesCrtl
 * @class DetailCrtl
 * @class ChapterCrtl
 * @requires 'app.storage', 'app.resource'
 * @param '$state' - Route $state to handle routing
 * @param 'storageService' - A service to store data using localStorage/sessionStorage
 * @param 'resourceService' - A service to call methods defined in resource factories
 */

(function(){
    'use strict';

    angular
        .module('app.series', ['app.storage', 'app.resource', 'swipe'])
        .controller('SeriesCrtl', SeriesCrtl)
        .controller('DetailCrtl', DetailCrtl)
        .controller('ChapterCrtl', ChapterCrtl);

        SeriesCrtl.$inject = ['$state', 'storageService', 'resourceService'];

        function SeriesCrtl($state, storageService, resourceService) {
            var vm = this;
            vm.seriesList = [];
            vm.margin = null;



            vm.goToDetail = goToDetail;
            vm.getSeriesList = getSeriesList;
            vm.filterData = filterData;

            getSeriesList();
            _setStyles();

            /**
             * Set model: retrieve data from service and set TV series list as model
             *
             * @method getSeriesList
             * @requires type - Optional
            */

            function getSeriesList(type) {
                resourceService.getConfig()
                    .then(function(){
                        resourceService.getSeriesList(type)
                            .success(function(data){
                                for(var i = 0; i < data.results.length; i++){
                                    var imgRoute = data.results[i].backdrop_path;
                                    var posterRoute = data.results[i].poster_path;
                                    data.results[i].img = resourceService.getSerieImage(imgRoute, 'cover');
                                    data.results[i].poster = resourceService.getSerieImage(posterRoute, 'poster');
                                }
                                vm.seriesList = data.results;
                            });
                    });
            }

            /**
             * Transition to 'detail' route
             *
             * @method goToDetail
             * @requires data
            */

            function goToDetail(data) {
                storageService.setData('localStorage', 'detailData', data);
                $state.go('detail');
            }

            /**
             * Call 'getSeriesList()' to reload data model
             *
             * @method filterData
             * @requires type
            */

            function filterData(type) {
                getSeriesList(type);
            }

            /**
             * Margin moviles - Private
             *
             * @method _setStyles
            */

            function _setStyles(){
                var width = window.innerWidth;

                switch (true) {
                    case (width >= 318 && width <= 335 ):
                        vm.margin = 'margin: 0.8%;';
                        break;
                    case (width > 335 && width <= 365 ):
                        vm.margin = 'margin: 2%;';
                        break;
                    case (width > 365 && width <= 380 ):
                        vm.margin = 'margin: 4%;';
                        break;
                    case (width > 380 && width <= 400 ):
                        vm.margin = 'margin: 5%;';
                        break;
                    case (width > 400 && width <= 430 ):
                        vm.margin = 'margin: 6%;';
                        break;
                    case (width > 430 && width <= 453 ):
                        vm.margin = 'margin: 7%;';
                        break;
                    case (width > 453 && width <= 480 ):
                        vm.margin = 'margin: 8%;';
                        break;
                    case (width > 480 && width <= 510 ):
                        vm.margin = 'margin: 9%;';
                        break;
                    case (width > 510 && width <= 525 ):
                        vm.margin = 'margin: 10%;';
                        break;

                    case (width > 525 && width <= 450 ):
                        vm.margin = 'margin: 0%;';
                        break;
                }


            }
        }

        DetailCrtl.$inject = ['$state', 'storageService', 'resourceService'];

        function DetailCrtl($state, storageService, resourceService) {
            var vm = this;
            vm.serieDetail = {};
            vm.showRightArrow = true;
            vm.showLeftArrow = false;
            vm.seasonData = null;

            vm.goToChapter = goToChapter;
            vm.getDetail = getDetail;
            vm.getSeasonData = getSeasonData;
            vm.swipeSeason = swipeSeason;
            vm.arrowControl = arrowControl;

            getDetail();

            /**
             * Set model: retrieve data from service and set TV serie detail as model
             *
             * @method getDetail
            */

            function getDetail() {
                var detailData = storageService.getData('localStorage', 'detailData');
                vm.serieDetail.main = detailData;

                resourceService.getSerieDetail(detailData.id)
                    .success(function(data){
                        vm.serieDetail.detail = data;
                        resourceService.getSeasons(detailData.id, 0)
                            .success(function(response){
                                if(response.episodes.length === 0){
                                    vm.serieDetail.error = 'There are not episodes for this season.';
                                }
                                vm.seasonData = true;
                                vm.serieDetail.seasons = response;
                            })
                            .error(function(){
                                vm.seasonData = false;
                                vm.serieDetail.error = 'Cannot retrieve any season from this TV serie.';
                            });
                    });
            }

            /**
             * Set model: retrieve data from service and set TV serie espisodes as model
             *
             * @method getSeasonArray
            */

            function getSeasonData(season){
                resourceService.getSeasons(vm.serieDetail.detail.id, season)
                    .success(function(response){
                        vm.serieDetail.seasons = response;
                    });
            }

            /**
             * Realod model with new season data on swipe/click
             *
             * @method swipeSeason
             * @requires {int} Season
             * @requires {String} Type
            */

            function swipeSeason(season, type) {
                var seasons = vm.serieDetail.detail.seasons.length;

                if(season >= 0 && season < seasons - 1 && type === 'next'){
                    season++;
                    vm.arrowControl(season, seasons);
                    vm.getSeasonData(season);
                } else if(season > 0 && season <= seasons - 1 && type === 'back') {
                    season--;
                    vm.arrowControl(season, seasons);
                    vm.getSeasonData(season);
                }
            }

            function arrowControl(season, seasons) {
                if(season > 0) {
                    vm.showLeftArrow = true;
                } else {
                    vm.showLeftArrow = false;
                }
                if(season < seasons - 1) {
                    vm.showRightArrow = true;
                } else {
                    vm.showRightArrow = false;
                }
            }

            /**
             * Transition to 'chapter' route
             *
             * @method goToChapter
             * @requires data
            */

            function goToChapter(data) {
                storageService.setData('localStorage', 'chapterData', data);
                $state.go('chapter');
            }

        }

        ChapterCrtl.$inject = ['$state', 'storageService', 'resourceService'];

        function ChapterCrtl($state, storageService, resourceService) {
            var vm = this;
            vm.episodeDetail = {};

            vm.getEpisodeDetail = getEpisodeDetail;

            getEpisodeDetail();

            /**
             * Set model: retrieve data from service and set TV serie detail as model
             *
             * @method getEpisodeDetail
            */

            function getEpisodeDetail() {
                var episodeData = storageService.getData('localStorage', 'chapterData'),
                    detailData = storageService.getData('localStorage', 'detailData');

                vm.episodeDetail.main = episodeData;
                vm.episodeDetail.detail = detailData;
                vm.episodeDetail.cast = [];

                resourceService.getEpisodeDetail(detailData.id, episodeData.season_number, episodeData.episode_number)
                    .success(function(response){
                        vm.episodeDetail.episode = response;
                        for(var i = 0; i < response.crew.length; i++) {
                            if(response.crew[i].job === 'Director'){
                                vm.episodeDetail.episode.director = response.crew[i].name;
                            }
                        }

                        resourceService.getEpisodeCast(detailData.id)
                            .success(function(data){
                                for(var j = 0; j < data.cast.length; j++) {
                                    vm.episodeDetail.cast[j] = data.cast[j].name;
                                }
                            });
                    });

                storageService.setData('localStorage', 'episodeData', vm.episodeDetail);
            }
        }
})();
