(function() {

    angular
        .module('app.core')
        .service('imageService', imageService);

    imageService.$inject = ['$http', '$q',  'imageModel',  'API', 'appConfig'];

    /**
    *   Service responsible for all actions on images (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {imageModel} imageModel - image domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function imageService($http, $q, imageModel, API, appConfig) {

        var service = this;

        // public methods
        service.getAll = getAll;
        

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
                url: appConfig.API_GET_IMAGE_ROUTE,
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
    }

}());
