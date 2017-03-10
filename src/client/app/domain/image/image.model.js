(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('imageModel', imageModelFactory);

    imageModelFactory.$inject = ['appConfig'];

    function imageModelFactory(appConfig) {

        /**
        *   Domain model of an image used for Creating new images
        *   @param {object} image - object for construction of new imageModel object
        */
        function imageModel(image) {
            
            this.objId = (image && image.objId) ? image.objId : 0;
            this.name = (image && image.name) ? image.name : '';
            this.content = (image && image.content) ? image.content : '';
            this.prefix = (image && image.prefix) ? image.prefix : '';
            this.contentType = (image && image.contentType) ? image.contentType : '';
        }

        return imageModel;
    }

})();
