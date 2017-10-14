(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('shareModel', shareModelFactory);

    shareModelFactory.$inject = ['appConfig', 'imageModel'];

    function shareModelFactory(appConfig,imageModel) {

        /**
        *   Domain model of an share used for Creating new share
        *   @param {object} share - object for construction of new shareModel object
        */
        function shareModel(share) {
            
            this.objId = (share && share.objId) ? share.objId : 0;
            this.isActive = (share && share.isActive != null) ? share.isActive : false;
            this.images = (share && share.images) ? share.images.map(function(image){ return new imageModel(image)})  : [];;
            this.barcode = (share && share.barcode) ? share.barcode : '';
            this.type = (share && share.type != null) ? share.type : '';
            this.objDescription = (share && share.objDescription) ? share.objDescription : '';
            this.percentage = (share && share.percentage) ? share.percentage : '';
            this.dateInNew = (share && share.dateInNew) ? share.dateInNew : null;
            this.countLimit = (share && share.countLimit) ? share.countLimit : '';
            this.detailsUrl = (share && share.detailsUrl) ? share.detailsUrl : '';
            this.timeLimit = (share && share.timeLimit) ? share.timeLimit : '';
            this.uniqueCode = (share && share.uniqueCode) ? share.uniqueCode : '';
            this.customBarcode = (share && share.customBarcode) ? share.customBarcode : '';
           
        }

        return shareModel;
    }

})();
