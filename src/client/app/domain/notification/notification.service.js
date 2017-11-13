(function () {

    angular
        .module('app.core')
        .service('notificationService', notificationService);

    notificationService.$inject = ['$http', '$q', 'API', 'appConfig', 'logger', 'notificationModel'];

    /**
    *   Service responsible for all actions on shops (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function notificationService($http, $q, API, appConfig, logger, notificationModel) {

        var service = this;

        // public methods
        service.sendPushNotification = sendPushNotification;
        service.sendPushNotificationToOrganization = sendPushNotificationToOrganization;
        service.sendPushNotificationToShare = sendPushNotificationToShare;
        service.addOrUpdate = addOrUpdate;
        service.remove = remove;
        service.getAll = getAll;


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
        function sendPushNotification(message, tags, os) {


             API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_NOTIFICATION_ROUTE,
                data: { "message": message, "tags": tags, "OS":os }
            })
                .then(function (response) {


            });
        }
        function sendPushNotificationToOrganization(message, organizationId, os) {


             API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_NOTIFICATION_ORGANIZATION_ROUTE,
                data: { "message": message, "Id": organizationId, "OS":os }
            })
             
        }
        function sendPushNotificationToShare(message, shareId, os) {


             API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_NOTIFICATION_SHARE_ROUTE,
                data: { "message": message, "Id": shareId, "OS":os }
            })
              
        }
        
        /**
        *   Calls API to get all organizations 
        *   @returns {Promise|organizationModel[]} - When promise is resolved returns an array of organizations
        */
        function getAll() {

           
            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_NOTIFICATION_ROUTE + appConfig.API_NOTIFICATION_TEMPLATE_ROUTE,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                    return  response.data.map(function(notification) {
                        return new notificationModel(notification);
                    });
                }
            });
        }
        
         /*
        *   Calls API to delete  notification template
        */
        function remove(id) {

            return API.http({
                method: appConfig.methods.DELETE,
                url: appConfig.API_NOTIFICATION_ROUTE + appConfig.API_NOTIFICATION_TEMPLATE_ROUTE,
                params: {"id":id}
            })
            .then(function(response) {

               logger.info('notification deleted');
            });
        }

         function addOrUpdate(item) {

            return API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_NOTIFICATION_ROUTE + appConfig.API_NOTIFICATION_TEMPLATE_ROUTE,
                data: item
            })
            .then(function(response) {

               logger.info('notification was added/updated successful');
               if (response.data) {

                  return new notificationModel(response.data);
                }
            });
        }
    }
} ());
