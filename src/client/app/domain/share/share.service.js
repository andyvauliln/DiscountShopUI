(function() {

    angular
        .module('app.core')
        .service('shareService', shareService);

    shareService.$inject = ['$http', '$q', 'API', 'appConfig'];

    /**
    *   Service responsible for all actions on shares (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {shareModel} shareModel - share domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function shareService($http, $q, API, appConfig) {

        var service = this;

        // public methods
        service.getAll = getAll;
        

        activate();

        /////////////////////////////

        /**
        *   shareService activator function, called only once, when the service is instantiated
        */
        function activate() {
        }

        /////////////////////////////

        /**
        *   Calls API to get all shares 
        *   @returns {Promise|shareModel[]} - When promise is resolved returns an array of shares
        */
        function getAll() {

           
            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_GET_SHARE_ROUTE,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                    return  response.data.shares.map(function(share) {
                        return new shareModel(share);
                    });
                }
            });
        }
        /**
        *   Calls API to get  shares
        *   @returns {Promise|shareModel} - When promise is resolved returns share
        */
        function getById(id) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_SHARE_ROUTE + id,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                  return new shareModel(response.data);
                }
            });
        }
        /*
        *   Calls API to delete  share
        */
        function remove(id) {

            return API.http({
                method: appConfig.methods.DELETE,
                url: appConfig.API_SHARE_ROUTE + id,
                params: {}
            })
            .then(function(response) {

               logger.info('share deleted');
            });
        }

         function addOrUpdate(item) {

            return API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_SHARE_ROUTE,
                params: item
            })
            .then(function(response) {

               logger.info('share was added/updated successful');
               if (response.data) {

                  return new shareModel(response.data);
                }
            });
        }
                
        

    }

}());
