(function(){
    'use strict';

    angular
        .module('app.detail', ['app.storage', 'app.resource'])
        .controller('DetailCrtl', DetailCrtl);

        DetailCrtl.$inject = ['$state', 'storageService', 'resourceService'];

        function DetailCrtl($state, storageService, resourceService) {
            var vm = this;
            vm.serieDetail = {};

            vm.goToDetail = goToDetail;
            vm.getSerieDetail = getSerieDetail;

            getSerieDetail();

            function getSerieDetail() {
                // var id = storageService.getData('localStorage', 'detailId');

                // console.log('Detail id: ' + id);

                resourceService.getSerieDetail(34524)
                    .success(function(data){
                        console.log(data);
                        // vm.serieDetail = data.results;
                    });
            }

            function goToDetail(id) {
                console.log('Id:' + id);
                $state.go('chapter');
            }

        }
})();
