(function() {

    angular
        .module('app.core')
        .service('organizationService', organizationService);

    organizationService.$inject = ['$http', '$q', 'logger', 'organizationModel',  'API', 'appConfig'];

    /**
    *   Service responsible for all actions on organizations (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {organizationModel} organizationModel - organization domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function organizationService($http, $q, logger, organizationModel, API, appConfig) {

        var service = this;

        // public methods
        service.getAll = getAll;

        service.getById = getById;
        service.remove = remove;
        service.addOrUpdate = addOrUpdate;
        service.attachCategory = attachCategory;
        service.attachImage = attachImage;
        service.attachShare = attachShare;
        service.attachShop = attachShop;
        service.attachIBeacon  = attachIBeacon;
        //service.deattachIBeacon = deattachIBeacon;
        service.deattachShop = deattachShop;
        service.deattachCategory = deattachCategory;
        service.deattachShare = deattachShare;
        service.deattachImage = deattachImage;

        

        activate();

        /////////////////////////////

        /**
        *   organizationService activator function, called only once, when the service is instantiated
        */
        function activate() {


        }

        function attachIBeacon(orgId,iBeaconId) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_ORGANIZATION_ROUTE + orgId + appConfig.API_ATTACH_IBEACON_TO_ORGANIZATION_ROUTE + iBeaconId,
                params: {}
            })
            .then(function(response) {

                if (response.data) {
                      logger.info('Item was attach successful');
                  return new organizationModel(response.data);
                }
            });
        }

        /////////////////////////////

        /**
        *   Calls API to get all organizations 
        *   @returns {Promise|organizationModel[]} - When promise is resolved returns an array of organizations
        */
        function getAll() {

           
            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_ORGANIZATION_ROUTE,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                    return  response.data.map(function(organization) {
                        return new organizationModel(organization);
                    });
                }
            });
        }

        /**
        *   Calls API to get  organizations
        *   @returns {Promise|organizationModel} - When promise is resolved returns organization
        */
        function getById(id) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_ORGANIZATION_ROUTE + id,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                  return new organizationModel(response.data);
                }
            });
        }
        /*
        *   Calls API to delete  organization
        */
        function remove(id) {

            return API.http({
                method: appConfig.methods.DELETE,
                url: appConfig.API_ORGANIZATION_ROUTE + id,
                params: {}
            })
            .then(function(response) {

               logger.info('organization deleted');
            });
        }

         function addOrUpdate(item) {

            return API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_ORGANIZATION_ROUTE,
                data: item
            })
            .then(function(response) {

               logger.info('organization was added/updated successful');
               if (response.data) {

                  return new organizationModel(response.data);
                }
            });
        }

////////////////////////////////////////////////////////////////////
        function attachShare(orgId,shareId) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_ORGANIZATION_ROUTE + orgId + appConfig.API_ATTACH_SHARE_TO_ORGANIZATION_ROUTE + shareId,
                params: {}
            })
            .then(function(response) {

                if (response.data) {
                     logger.info('Item was add successful');
                  return new organizationModel(response.data);
                }
            });

            
        }
        function attachShop(orgId,shopId) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_ORGANIZATION_ROUTE + orgId + appConfig.API_ATTACH_SHOP_TO_ORGANIZATION_ROUTE + shopId,
                params: {}
            })
            .then(function(response) {

                if (response.data) {
                      logger.info('Item was attach successful');
                  return new organizationModel(response.data);
                }
            });
        }
        
         function attachCategory(orgId,categoryId) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_ORGANIZATION_ROUTE + orgId + appConfig.API_ATTACH_CATEGORY_TO_ORGANIZATION_ROUTE + categoryId,
                params: {}
            })
            .then(function(response) {

                if (response.data) {
                    logger.info('Item was attach successful');
                  return new organizationModel(response.data);
                }
            });
        }
         function attachImage(orgId, imageId) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_ORGANIZATION_ROUTE + orgId + appConfig.API_ATTACH_IMAGE_TO_ORGANIZATION_ROUTE + imageId,
                params: {}
            })
            .then(function(response) {

                if (response.data) {
                      logger.info('Item was attach successful');
                  return new organizationModel(response.data);
                }
            });
        }

        /////////////////////////////////////////////////////////
        function deattachShare(orgId,shareId) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_ORGANIZATION_ROUTE + orgId + appConfig.API_DEATTACH_SHARE_FROM_ORGANIZATION_ROUTE + shareId,
                params: {}
            })
            .then(function(response) {

                if (response.data) {
                     logger.info('Item was deattach successful');
                  return new organizationModel(response.data);
                }
            });

            
        }
        function deattachShop(orgId,shopId) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_ORGANIZATION_ROUTE + orgId + appConfig.API_DEATTACH_SHOP_FROM_ORGANIZATION_ROUTE + shopId,
                params: {}
            })
            .then(function(response) {

                if (response.data) {
                      logger.info('Item was deattach successful');
                  return new organizationModel(response.data);
                }
            });
        }
         function deattachCategory(orgId,categoryId) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_ORGANIZATION_ROUTE + orgId + appConfig.API_DEATTACH_CATEGORY_FROM_ORGANIZATION_ROUTE + categoryId,
                params: {}
            })
            .then(function(response) {

                if (response.data) {
                     logger.info('Item was deattach successful');
                  return new organizationModel(response.data);
                }
            });
        }
         function deattachImage(orgId, imageId) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_ORGANIZATION_ROUTE + orgId + appConfig.API_DEATTACH_IMAGE_FROM_ORGANIZATION_ROUTE + imageId,
                params: {}
            })
            .then(function(response) {

                if (response.data) {
                      logger.info('Item was deattach successful');
                  return new organizationModel(response.data);
                }
            });
        }
        
    }

}());
