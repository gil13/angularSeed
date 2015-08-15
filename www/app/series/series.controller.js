(function(){
    'use strict';

    angular
        .module('app.series', ['app.storage', 'app.resource'])
        .controller('SeriesCrtl', SeriesCrtl);

        SeriesCrtl.$inject = ['$state', 'storageService', 'resourceService'];

        function SeriesCrtl($state, storageService, resourceService) {
            var vm = this;
            vm.seriesList = [];

            vm.goToDetail = goToDetail;
            vm.getSeriesList = getSeriesList;

            getSeriesList();

            function getSeriesList() {
    //         resourceService.getSerieDetail(34524)
    //             .success(function(data){
    //                 console.log(data);
    //                 vm.serieDetail = data;
    //             });


                resourceService.getConfig()
                    .success(function(){
                        resourceService.getSeriesList('popular')
                            .success(function(data){
                                for(var i = 0; i < data.results.length; i++){
                                    var imgRoute = data.results[i].backdrop_path;
                                    data.results[i].img = resourceService.getSerieImage(imgRoute);
                                }
                                vm.seriesList = data.results;
                            });
                    });
            }

            function goToDetail(data) {
                storageService.setData('localStorage', 'detailData', data);
                $state.go('detail');
            }

        }
})();
