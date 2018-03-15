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
            this.title = (notification && notification.title) ? notification.title : '';
            this.url = (notification && notification.url) ? notification.url : '';
            this.name = (notification && notification.name) ? notification.name : '';
            this.text = (notification && notification.text) ? notification.text : '';
            this.type = (notification && notification.type) ? notification.type : null;
            this.activationDate = (notification && notification.activationDate) ? notification.activationDate : null;
            this.diactivationDate = (notification && notification.diactivationDate) ? notification.diactivationDate : null;
            this.longitude = (notification && notification.longitude) ? notification.longitude :  27.60863829999994;
            this.latitude = (notification && notification.latitude) ? notification.latitude :53.9347787;
            this.radius = (notification && notification.radius) ? notification.radius : 2500;
            this.isActive = (notification && notification.isActive) ? notification.isActive : '';

        }

        return notificationModel;
    }

})();
