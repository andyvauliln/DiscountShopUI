(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('userModel', userModelFactory);

    userModelFactory.$inject = ['appConfig', 'shareModel'];

    function userModelFactory(appConfig, shareModel) {

        /**
        *   Domain model of an user used for Creating new users
        *   @param {object} user - object for construction of new userModel object
        */
        function userModel(user) {
            
            this.objId = (user && user.objId) ? user.objId : 0;
            this.email = (user && user.email) ? user.email : '';
            this.password = (user && user.password) ? user.password : 'asdQWE123';
            this.firstName = (user && user.firstName) ? user.firstName : '';
            this.lastName = (user && user.lastName) ? user.lastName : '';
            this.points = (user && user.points) ? user.points : null;
            this.shares = (user && user.shareItems) ? user.shareItems.map(function(share){ return new shareModel(share)})  : [];
            this.dateOfBirth = (user && user.dateOfBirth) ? user.dateOfBirth : null;
            this.male = (user && user.male) ? user.male : null;
            this.city = (user && user.cityModel) ? user.cityModel : null;
            this.phone = (user && user.phone) ? user.phone : null;
            this.cityId = (user && user.cityId) ? user.cityId : null;
        }

        return userModel;
    }

})();
