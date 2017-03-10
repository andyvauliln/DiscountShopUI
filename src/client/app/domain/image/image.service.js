(function() {

    angular
        .module('app.core')
        .service('imageService', imageService);

    imageService.$inject = ['$http', '$q',  'imageModel',  'API', 'appConfig', 'logger'];

    /**
    *   Service responsible for all actions on images (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {imageModel} imageModel - image domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function imageService($http, $q, imageModel, API, appConfig, logger) {

        var service = this;

        // public methods
        service.getAll = getAll;
        service.getById = getById;
        service.remove = remove;
        service.addOrUpdate = addOrUpdate;
        

        activate();

        /////////////////////////////

        /**
        *   imageService activator function, called only once, when the service is instantiated
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
                url: appConfig.API_IMAGE_ROUTE,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                    return  response.data.images.map(function(image) {
                        return new imageModel(image);
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
                url: appConfig.API_IMAGE_ROUTE2 + id,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                  return new imageModel(response.data);
                }
            });
        }
        /*
        *   Calls API to delete  image
        */
        function remove(id) {

            return API.http({
                method: appConfig.methods.DELETE,
                url: appConfig.API_IMAGE_ROUTE2 + id,
                params: {}
            })
            .then(function(response) {

               logger.info('image deleted');
            });
        }

         function addOrUpdate(item) {

            return API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_IMAGE_ROUTE2,
                data: item
            })
            .then(function(response) {

               logger.info('image was added/updated successful');
               if (response.data) {

                  return new imageModel(response.data);
                }
            });
        }
        ///////////////////////////////////////////////
    }

}());
