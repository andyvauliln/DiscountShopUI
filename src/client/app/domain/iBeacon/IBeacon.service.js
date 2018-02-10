(function() {

    angular
        .module('app.core')
        .service('iBeaconService', iBeaconService);

    iBeaconService.$inject = ['$http', '$q',  'iBeaconModel',  'API', 'appConfig', 'logger'];

    /**
    *   Service responsible for all actions on images (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {iBeaconModel} iBeaconModel - image domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function iBeaconService($http, $q, iBeaconModel, API, appConfig, logger) {

        var service = this;

        // public methods
        service.getAll = getAll;
        service.getById = getById;
        service.remove = remove;
        service.addOrUpdate = addOrUpdate;
        

        activate();

        /////////////////////////////

        /**
        *   iBeaconService activator function, called only once, when the service is instantiated
        */
        function activate() {


        }

        /////////////////////////////

        /**
        *   Calls API to get all images 
        *   @returns {Promise|imageModel[]} - When promise is resolved returns an array of images
        */
        function getAll() {

           
            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_IBEACON_ROUTE,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                    return  response.data.images.map(function(image) {
                        return new iBeaconModel(image);
                    });
                }
            });
        }
        /**
        *   Calls API to get  images
        *   @returns {Promise|imageModel} - When promise is resolved returns image
        */
        function getById(id) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_IBEACON_ROUTE + id,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                  return new iBeaconModel(response.data);
                }
            });
        }
        /*
        *   Calls API to delete  image
        */
        function remove(id) {

            return API.http({
                method: appConfig.methods.DELETE,
                url: appConfig.API_IBEACON_ROUTE + id,
                params: {}
            })
            .then(function(response) {

               logger.info('image deleted');
            });
        }

         function addOrUpdate(item) {

            return API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_IBEACON_ROUTE,
                data: item
            })
            .then(function(response) {

               logger.info('image was added/updated successful');
               if (response.data) {

                  return new iBeaconModel(response.data);
                }
            });
        }
        ///////////////////////////////////////////////
    }

}());
