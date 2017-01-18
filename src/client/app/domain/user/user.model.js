(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('userModel', userModelFactory);

    userModelFactory.$inject = ['appConfig', 'discountCardModel', 'couponModel'];

    function userModelFactory(appConfig, discountCardModel, couponModel) {

        /**
        *   Domain model of an user used for Creating new users
        *   @param {object} user - object for construction of new userModel object
        */
        function userModel(user) {
            
            this.id = (user && user.objId) ? user.objId : '';
            this.email = (user && user.email) ? user.email : '';
            this.password = (user && user.password) ? user.password : '';
            this.firstName = (user && user.firstName) ? user.firstName : '';
            this.lastName = (user && user.lastName) ? user.lastName : '';
            this.discountCardsMaxCount = (user && user.discountCardsMaxCount) ? user.discountCardsMaxCount : null;
            this.couponsMaxCount = (user && user.couponsMaxCount) ? user.couponsMaxCount : null;
            
            this.discountCards = (user && user.discountCards) ? user.discountCards.map(function(discountCard){ return new discountCardModel(discountCard)})  : [];
            this.coupons = (user && user.coupons) ? user.coupons.map(function(coupon){ return new couponModel(coupon)})  : [];
        }

        return userModel;
    }

})();
