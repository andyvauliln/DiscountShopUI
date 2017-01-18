(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('couponCodeModel', couponCodeModelFactory);

    couponCodeModelFactory.$inject = ['appConfig'];

    function couponCodeModelFactory(appConfig) {

        /**
        *   Domain model of an couponCode used for Creating new couponCodes
        *   @param {object} couponCode - object for construction of new couponCodeModel object
        */
        function couponCodeModel(couponCode) {
            
            this.id = (couponCode && couponCode.objId) ? couponCode.objId : '';
            this.isActive = (couponCode && couponCode.isActive != null) ? couponCode.isActive : false;
            this.code = (couponCode && couponCode.code) ? couponCode.code : '';
           
        }

        return couponCodeModel;
    }

})();
