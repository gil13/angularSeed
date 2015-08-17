/**
 * Initialize resources on init - Used with series/series.html template
 *
 * @module app
 * @class Initializer
 * @param 'FastClick' - (document.body)
*/

(function(){
    'use strict';

    angular
        .module('app', [])
        .run(function() {
            FastClick.attach(document.body);
        });

})();
