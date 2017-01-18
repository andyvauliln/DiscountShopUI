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
                url: appConfig.API_GET_USER_ROUTE,
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
    }

}());
