(function() {

    angular
        .module('app.core')
        .service('userService', userService);

    userService.$inject = ['$http', '$q',  'userModel',  'API', 'appConfig'];

    /**
    *   Service responsible for all actions on users (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {userModel} userModel - user domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function userService($http, $q, userModel, API, appConfig) {

        var service = this;

        // public methods
        service.getAll = getAll;
        

        activate();

        /////////////////////////////

        /**
        *   userService activator function, called only once, when the service is instantiated
        */
        function activate() {


        }

        /////////////////////////////

        /**
        *   Calls API to get all users 
        *   @returns {Promise|userModel[]} - When promise is resolved returns an array of users
        */
        function getAll() {

           
            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_USER_ROUTE,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                    return  response.data.users.map(function(user) {
                        return new userModel(user);
                    });
                }
            });
        }
        /**
        *   Calls API to get  users
        *   @returns {Promise|userModel} - When promise is resolved returns user
        */
        function getById(id) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_USER_ROUTE + id,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                  return new userModel(response.data);
                }
            });
        }
        /*
        *   Calls API to delete  user
        */
        function remove(id) {

            return API.http({
                method: appConfig.methods.DELETE,
                url: appConfig.API_USER_ROUTE + id,
                params: {}
            })
            .then(function(response) {

               logger.info('user deleted');
            });
        }

         function addOrUpdate(item) {

            return API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_USER_ROUTE,
                params: item
            })
            .then(function(response) {

               logger.info('user was added/updated successful');
               if (response.data) {

                  return new userModel(response.data);
                }
            });
        }

////////////////////////////////////////////////////////////////////
        function attachShare(orgId,shareId) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_USER_ROUTE + orgId + appConfig.API_ATTACH_SHARE_TO_USER_ROUTE + shareId,
                params: {}
            })
            .then(function(response) {

                if (response.data) {
                     logger.info('Item was add successful');
                  return new userModel(response.data);
                }
            });
        }
        function deattachShare(orgId,shareId) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_USER_ROUTE + orgId + appConfig.API_DEATTACH_SHARE_FROM_USER_ROUTE + shareId,
                params: {}
            })
            .then(function(response) {

                if (response.data) {
                     logger.info('Item was deattach successful');
                  return new userModel(response.data);
                }
            });

            
        }
    }

}());
