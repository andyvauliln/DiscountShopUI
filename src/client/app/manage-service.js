(function () {

    angular
        .module('app.core')
        .service('manageService', manageService);

    manageService.$inject = ['$http', '$q', 'API', 'appConfig', 'logger'];

    /**
    *   Service responsible for all actions on shops (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function manageService($http, $q, API, appConfig, logger) {

        var service = this;

        // public methods
        service.sendPushNotification = sendPushNotification;
        service.sendPushNotificationToOrganization = sendPushNotificationToOrganization;
        service.sendPushNotificationToShare = sendPushNotificationToShare;


        activate();

        /////////////////////////////

        /**
        *   shopService activator function, called only once, when the service is instantiated
        */
        function activate() {


        }

        /////////////////////////////

        /**
        *   Calls API to get all shops 
        *   @returns {Promise|shopModel[]} - When promise is resolved returns an array of shops
        */
        function sendPushNotification(message, tags) {


            return API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_NOTIFICATION_ROUTE,
                data: { "message": message, "tags": tags }
            })
                .then(function (response) {


            });
        }
        function sendPushNotificationToOrganization(message, organizationId) {


            return API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_NOTIFICATION_ORGANIZATION_ROUTE,
                data: { "message": message, "Id": organizationId }
            })
                .then(function (response) {


            });
        }
        function sendPushNotificationToShare(message, shareId) {


            return API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_NOTIFICATION_SHARE_ROUTE,
                data: { "message": message, "Id": shareId }
            })
                .then(function (response) {


            });
        }
    }
} ());
