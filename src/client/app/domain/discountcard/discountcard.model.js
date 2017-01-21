(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('discountModel', discountModelFactory);

    discountModelFactory.$inject = ['appConfig', 'imageModel'];

    function discountModelFactory(appConfig, imageModel) {

        /**
        *   Domain model of an discountcard used for Creating new discountcards
        *   @param {object} discountcard - object for construction of new discountModel object
        */
        function discountModel(discountcard) {
           
            this.id = (discountcard && discountcard.objId) ? discountcard.objId : '';
            this.name = (discountcard && discountcard.name) ? discountcard.name : '';
            this.frontSideImg = (discountcard && discountcard.frontSideImg) ? new imageModel(discountcard.frontSideImg) : null;
            this.backSideImg = (discountcard && discountcard.backSideImg) ? new imageModel(discountcard.backSideImg) : null;
            this.barcode = (discountcard && discountcard.barcode) ? discountcard.barcode : '';
        }

        return discountModel;
    }

})();
