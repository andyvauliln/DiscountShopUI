(function() {

    angular
        .module('app.core')
        .service('shopService', shopService);

    shopService.$inject = ['$http', '$q',  'shopModel',  'API', 'appConfig', 'logger'];

    /**
    *   Service responsible for all actions on shops (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {shopModel} shopModel - shop domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function shopService($http, $q, shopModel, API, appConfig, logger) {

        var service = this;

        // public methods
        service.getAll = getAll;
        service.getById = getById;
        service.remove = remove;
        service.addOrUpdate = addOrUpdate;

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
                url: appConfig.API_SHOP_ROUTE,
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

        /**
        *   Calls API to get  shops
        *   @returns {Promise|shopModel} - When promise is resolved returns shop
        */
        function getById(id) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_SHOP_ROUTE + id,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                  return new shopModel(response.data);
                }
            });
        }
        /*
        *   Calls API to delete  shop
        */
        function remove(id) {

            return API.http({
                method: appConfig.methods.DELETE,
                url: appConfig.API_SHOP_ROUTE + id,
                params: {}
            })
            .then(function(response) {

               logger.info('shop deleted');
            });
        }

         function addOrUpdate(item) {

            return API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_SHOP_ROUTE,
                data: item
            })
            .then(function(response) {

               logger.info('shop was added/updated successful');
               if (response.data) {

                  return new shopModel(response.data);
                }
            });
        }
    }

}());
