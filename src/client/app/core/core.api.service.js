(function() {
    'use strict';

    angular
        .module('app.core')
        .service('API', API);

    API.$inject = ['$q', '$state', '$http', 'appConfig', 'ipCookie'];

    /**
    *   Service to route http requests based on the URL
    *   @param {$q} $q - Angular's $q service
    *   @param {$http} $http - Angular's $http service
    *   @param {Object} config - Application configuration
    */
    function API($q, $state, $http, appConfig, ipCookie) {

        var service = this;

        // public methods
        service.http = http;

        // variables
        var Id;

        //////////////////////////////

        /**
        *   Wrapper for angular's $http
        *   @param {Object} obj - Object that is passed to the angular's $http module
        *   @returns {Promise|Object} - When the promise is resolved, returns anular (or angular like) response object
        */
        function http(obj) {

          obj.url = appConfig.API_HOST + obj.url;
          obj.headers = { 'Authorization' : ipCookie(appConfig.AUTH_COOKIE)}

          return $http(obj).then(function successCallback(response) {

            return response
   
        }, function errorCallback(response) {

                if(response.status == 401)
                {
                    $state.go('login');
                }
                else {
                    return response;
                }
        });
        }
    }

})();
