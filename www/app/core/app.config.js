(function(){
    'use strict';

    angular
        .module('app', [])
        .run(function() {
            FastClick.attach(document.body);
        });

})();
