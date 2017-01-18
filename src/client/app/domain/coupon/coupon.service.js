(function() {

    angular
        .module('app.core')
        .service('couponService', couponService);

    couponService.$inject = ['$http', '$q',  'couponModel',  'API', 'appConfig'];

    /**
    *   Service responsible for all actions on coupons (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {couponModel} couponModel - coupon domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function couponService($http, $q, couponModel, API, appConfig) {

        var service = this;

        // public methods
        service.getAll = getAll;
        

        activate();

        /////////////////////////////

        /**
        *   couponService activator function, called only once, when the service is instantiated
        */
        function activate() {


        }

        /////////////////////////////

        /**
        *   Calls API to get all coupons 
        *   @returns {Promise|couponModel[]} - When promise is resolved returns an array of coupons
        */
        function getAll() {

           
            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_GET_COUPON_ROUTE,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                    return  response.data.coupons.map(function(coupon) {
                        return new couponModel(coupon);
                    });
                }
            });
        }
    }

}());
