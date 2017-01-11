(function() {

    angular
        .module('app.core')
        .service('organizationService', organizationService);

    organizationService.$inject = ['$http', '$q',  'organizationModel',  'API', 'appConfig'];

    /**
    *   Service responsible for all actions on organizations (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {organizationModel} organizationModel - organization domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function organizationService($http, $q, organizationModel, API, appConfig) {

        var service = this;

        // public methods
        service.getAll = getAll;
        

        activate();

        /////////////////////////////

        /**
        *   organizationService activator function, called only once, when the service is instantiated
        */
        function activate() {


        }

        /////////////////////////////

        /**
        *   Calls API to get all organizations 
        *   @returns {Promise|organizationModel[]} - When promise is resolved returns an array of organizations
        */
        function getAll() {

           
            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_GET_ORGANIZATION_ROUTE,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                    return  response.data.organizations.map(function(organization) {
                        return new organizationModel(organization);
                    });
                }
            });
        }
    }

}());
