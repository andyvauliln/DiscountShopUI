(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('categoryModel', categoryModelFactory);

    categoryModelFactory.$inject = ['appConfig'];

    function categoryModelFactory(appConfig) {

        /**
        *   Domain model of an category used for Creating new categorys
        *   @param {object} category - object for construction of new categoryModel object
        */
        function categoryModel(category) {
            
            this.id = (category && category.objId) ? category.objId : '';
            this.description = (category && category.objDescription) ? category.objDescription : '';
            this.name = (category && category.name) ? category.name: '';
        }

        return categoryModel;
    }

})();
