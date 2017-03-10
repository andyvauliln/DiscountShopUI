(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('shareModel', shareModelFactory);

    shareModelFactory.$inject = ['appConfig'];

    function shareModelFactory(appConfig) {

        /**
        *   Domain model of an share used for Creating new share
        *   @param {object} share - object for construction of new shareModel object
        */
        function shareModel(share) {
            
            this.objId = (share && share.objId) ? share.objId : 0;
            this.isActive = (share && share.isActive != null) ? share.isActive : false;
            this.barcode = (share && share.barcode) ? share.barcode : '';
            this.type = (share && share.type) ? share.type : '';
            this.objDescription = (share && share.objDescription) ? share.objDescription : '';
            this.percentage = (share && share.percentage) ? share.percentage : '';
           
        }

        return shareModel;
    }

})();
