(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('couponModel', couponModelFactory);

    couponModelFactory.$inject = ['appConfig', 'couponCodeModel', 'imageModel'];

    function couponModelFactory(appConfig, couponCodeModel, imageModel) {

        /**
        *   Domain model of an coupon used for Creating new coupons
        *   @param {object} coupon - object for construction of new couponModel object
        */
        function couponModel(coupon) {
            
            this.id = (coupon && coupon.objId) ? coupon.objId : '';
            this.description = (coupon && coupon.objDescription) ? coupon.objDescription : '';
            this.image = (coupon && coupon.image) ? new imageModel(coupon.image) : null;
            this.couponCodes = (coupon && coupon.couponCodes) ? coupon.couponCodes.map(function(code){  return new couponCodeModel(code)}) : [];
            
        }

        return couponModel;
    }

})();
