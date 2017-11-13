(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('notificationModel',notificationModelFactory);

    notificationModelFactory.$inject = ['appConfig'];

    function notificationModelFactory(appConfig) {

        /**
        *   Domain model of an organization used for Creating new organizations
        *   @param {object} organization - object for construction of new organizationModel object
        */
        function notificationModel(notification) {
            
            this.objId = (notification && notification.objId) ? notification.objId : 0;
            this.name = (notification && notification.name) ? notification.name : '';
            this.text = (notification && notification.text) ? notification.text : '';
            this.type = (notification && notification.type) ? notification.type : null;
            this.activationDate = (notification && notification.activationDate) ? notification.activationDate : null;
            this.diactivationDate = (notification && notification.diactivationDate) ? notification.diactivationDate : null;
            this.longitude = (notification && notification.longitude) ? notification.longitude : 0;
            this.latitude = (notification && notification.latitude) ? notification.latitude : 0;
            this.radius = (notification && notification.radius) ? notification.radius : 0;

        }

        return notificationModel;
    }

})();
