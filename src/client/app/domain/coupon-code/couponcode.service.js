(function() {

    angular
        .module('app.core')
        .service('couponCodeService', couponCodeService);

    couponCodeService.$inject = ['$http', '$q',  'couponCodeModel',  'API', 'appConfig'];

    /**
    *   Service responsible for all actions on couponCodes (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {couponCodeModel} couponCodeModel - couponCode domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function couponCodeService($http, $q, couponCodeModel, API, appConfig) {

        var service = this;

        // public methods
        service.getAll = getAll;
        

        activate();

        /////////////////////////////

        /**
        *   couponCodeService activator function, called only once, when the service is instantiated
        */
        function activate() {


        }

        /////////////////////////////

        /**
        *   Calls API to get all couponCodes 
        *   @returns {Promise|couponCodeModel[]} - When promise is resolved returns an array of couponCodes
        */
        function getAll() {

           
            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_GET_COUPONCODE_ROUTE,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                    return  response.data.couponCodes.map(function(couponCode) {
                        return new couponCodeModel(couponCode);
                    });
                }
            });
        }
    }

}());
