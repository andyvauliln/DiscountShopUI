(function() {

    angular
        .module('app.core')
        .service('shopService', shopService);

    shopService.$inject = ['$http', '$q',  'shopModel',  'API', 'appConfig'];

    /**
    *   Service responsible for all actions on shops (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {shopModel} shopModel - shop domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function shopService($http, $q, shopModel, API, appConfig) {

        var service = this;

        // public methods
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
        function getAll() {

           
            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_GET_SHOP_ROUTE,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                    return  response.data.shops.map(function(shop) {
                        return new shopModel(shop);
                    });
                }
            });
        }
    }

}());
