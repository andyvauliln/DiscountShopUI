(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('organizationModel', organizationModelFactory);

    organizationModelFactory.$inject = ['appConfig', 'categoryModel', 'shopModel', 'imageModel', 'discountCardModel', 'couponModel'];

    function organizationModelFactory(appConfig, categoryModel, shopModel, imageModel, discountCardModel, couponModel) {

        /**
        *   Domain model of an organization used for Creating new organizations
        *   @param {object} organization - object for construction of new organizationModel object
        */
        function organizationModel(organization) {
            
            this.id = (organization && organization.objId) ? organization.objId : '';
            this.name = (organization && organization.name) ? organization.name : '';
            this.siteUrl = (organization && organization.siteUrl) ? organization.siteUrl : '';
            this.description = (organization && organization.objDescription) ? organization.objDescription : '';
            this.keyWords = (organization && organization.keyWords) ? organization.keyWords : '';
            this.dateInNew = (organization && organization.newDate) ? organization.dateInNew : null;
            this.dateInTop = (organization && organization.topDate) ? organization.dateInTop : null;
            this.dateInSale = (organization && organization.saleDate) ? organization.dateInSale : '';
            
            this.categories = (organization && organization.categories) ?  organization.categories.map(function(category){ return new categoryModel(category)}) : [];
            this.shops = (organization && organization.shops) ? organization.shops.map(function(shop){ return new shopModel(shop)})  : [];
            this.images = (organization && organization.images) ? organization.images.map(function(image){ return new imageModel(image)})  : [];
            this.discountCards = (organization && organization.discountCards) ? organization.discountCards.map(function(discountCard){ return new discountCardModel(discountCard)})  : [];
            this.coupons = (organization && organization.coupons) ? organization.coupons.map(function(coupon){ return new couponModel(coupon)})  : [];
        }

        return organizationModel;
    }

})();
