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
            
            this.id = (image && image.objId) ? image.objId : '';
            this.name = (image && image.name) ? image.name : '';
            this.content = (image && image.content) ? image.content : '';
            this.contentType = (image && image.contentType) ? image.contentType : '';
        }

        return imageModel;
    }

})();
