(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('shopModel', shopModelFactory);

    shopModelFactory.$inject = ['appConfig'];

    function shopModelFactory(appConfig) {

        /**
        *   Domain model of an shop used for Creating new shops
        *   @param {object} shop - object for construction of new shopModel object
        */
        function shopModel(shop) {
            
            this.objId = (shop && shop.objId) ? shop.objId : 0;
            this.name = (shop && shop.name) ? shop.name : '';
            this.address = (shop && shop.address) ? shop.address : '';
            this.city = (shop && shop.city) ? shop.city : '';
            this.password = (shop && shop.password) ? shop.password : '';
            this.phone = (shop && shop.phone) ? shop.phone : '';
            this.shedule = (shop && shop.shedule) ? shop.shedule : '';
            this.latitude = (shop && shop.latitude) ? shop.latitude : '';
            this.longitude = (shop && shop.longitude) ? shop.longitude : '';
            
        }

        return shopModel;
    }

})();
