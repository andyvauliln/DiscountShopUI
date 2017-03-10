(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('organizationModel', organizationModelFactory);

    organizationModelFactory.$inject = ['appConfig','categoryModel', 'shopModel', 'imageModel', 'shareModel'];

    function organizationModelFactory(appConfig, categoryModel, shopModel, imageModel, shareModel) {

        /**
        *   Domain model of an organization used for Creating new organizations
        *   @param {object} organization - object for construction of new organizationModel object
        */
        function organizationModel(organization) {
            
            this.objId = (organization && organization.objId) ? organization.objId : 0;
            this.name = (organization && organization.name) ? organization.name : '';
            this.siteUrl = (organization && organization.siteUrl) ? organization.siteUrl : '';
            this.objDescription = (organization && organization.objDescription) ? organization.objDescription : '';
            this.keyWords = (organization && organization.keyWords) ? organization.keyWords : '';
            this.dateInNew = (organization && organization.dateInNew) ? organization.dateInNew : null;
            this.downloadCount = (organization && organization.downloadCount) ? organization.downloadCount : null;

            this.categories = (organization && organization.categories) ?  organization.categories.map(function(category){ return new categoryModel(category)}) : [];
            this.shops = (organization && organization.shops) ? organization.shops.map(function(shop){ return new shopModel(shop)})  : [];
            this.images = (organization && organization.images) ? organization.images.map(function(image){ return new imageModel(image)})  : [];
            this.shares = (organization && organization.shares) ? organization.shares.map(function(image){ return new imageModel(image)})  : [];
            this.categoryIds = (organization && organization.categories) ?  organization.categories.map(function(category){ return category.objId}) : [];
            //this.discountCards = (organization && organization.discountCards) ? organization.discountCards.map(function(discountCard){ return new shareModel(discountCard)})  : [];
           // this.coupons = (organization && organization.coupons) ? organization.coupons.map(function(coupon){ return new shareModel(coupon)})  : [];
        }

        return organizationModel;
    }

})();
