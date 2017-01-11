(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('organizationModel', organizationModelFactory);

    organizationModelFactory.$inject = ['appConfig'];

    function organizationModelFactory(appConfig) {

        /**
        *   Domain model of an organization used for Creating new organizations
        *   @param {object} organization - object for construction of new organizationModel object
        */
        function organizationModel(organization) {
            
            this.id = (organization && organization.objId) ? organization.objId : '';
            this.name = (organization && organization.name) ? organization.name : '';
            this.description = (organization && organization.objDescription) ? organization.objDescription : '';
            this.keyWords = (organization && organization.keyWords) ? organization.keyWords : '';
            this.newDate = (organization && organization.newDate) ? organization.newDate : null;
            this.topDate = (organization && organization.topDate) ? organization.topDate : null;
            this.saleDate = (organization && organization.saleDate) ? organization.saleDate : '';
            
            this.categories = (organization && organization.categories) ? organization.categories : [];
            this.shops = (organization && organization.shops) ? organization.shops : [];
            this.images = (organization && organization.images) ? organization.images : [];
            this.discountCards = (organization && organization.discountCards) ? organization.discountCards : [];
            this.coupons = (organization && organization.coupons) ? organization.coupons : [];
        }

        return organizationModel;
    }

})();
