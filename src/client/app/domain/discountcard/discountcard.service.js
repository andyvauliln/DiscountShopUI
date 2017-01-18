(function() {

    angular
        .module('app.core')
        .service('discountcardService', discountcardService);

    discountcardService.$inject = ['$http', '$q',  'discountcardModel',  'API', 'appConfig'];

    /**
    *   Service responsible for all actions on discountcards (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {discountcardModel} discountcardModel - discountcard domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function discountcardService($http, $q, discountcardModel, API, appConfig) {

        var service = this;

        // public methods
        service.getAll = getAll;
        

        activate();

        /////////////////////////////

        /**
        *   discountcardService activator function, called only once, when the service is instantiated
        */
        function activate() {


        }

        /////////////////////////////

        /**
        *   Calls API to get all discountcards 
        *   @returns {Promise|discountcardModel[]} - When promise is resolved returns an array of discountcards
        */
        function getAll() {

           
            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_GET_DISCOUNTCARD_ROUTE,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                    return  response.data.discountcards.map(function(discountcard) {
                        return new discountcardModel(discountcard);
                    });
                }
            });
        }
    }

}());
