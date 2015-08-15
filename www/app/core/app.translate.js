(function(){
    'use strict';

    angular
        .module('app.translate', ['pascalprecht.translate'])
        .config(translate);

        translate.$inject = ['$translateProvider'];

        function translate($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                files: {
                    prefix: '../common/languages/',
                    suffix: '.json'
                }
            });
            $translateProvider.preferredLanguage('en');
            $translateProvider.useSanitizeValueStrategy('sanitize');
            $translateProvider.useSanitizeValueStrategy('escaped');
        }
})();
