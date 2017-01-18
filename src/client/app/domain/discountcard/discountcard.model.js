(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('discountcardModel', discountcardModelFactory);

    discountcardModelFactory.$inject = ['appConfig', 'imageModel'];

    function discountcardModelFactory(appConfig, imageModel) {

        /**
        *   Domain model of an discountcard used for Creating new discountcards
        *   @param {object} discountcard - object for construction of new discountcardModel object
        */
        function discountcardModel(discountcard) {
            
            this.id = (discountcard && discountcard.objId) ? discountcard.objId : '';
            this.name = (discountcard && discountcard.name) ? discountcard.name : '';
            this.frontSideImg = (discountcard && discountcard.frontSideImg) ? new imageModel(discountcard.frontSideImg) : null;
            this.backSideImg = (discountcard && discountcard.backSideImg) ? new imageModel(discountcard.backSideImg) : null;
            this.barcode = (discountcard && discountcard.barcode) ? discountcard.barcode : '';
          
        }

        return discountcardModel;
    }

})();
