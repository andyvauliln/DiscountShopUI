(function() {

    angular
        .module('app.core')
        .service('categoryService', categoryService);

    categoryService.$inject = ['$http', '$q',  'categoryModel',  'API', 'appConfig'];

    /**
    *   Service responsible for all actions on categorys (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {categoryModel} categoryModel - category domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function categoryService($http, $q, categoryModel, API, appConfig) {

        var service = this;

        // public methods
        service.getAll = getAll;
        

        activate();

        /////////////////////////////

        /**
        *   categoryService activator function, called only once, when the service is instantiated
        */
        function activate() {


        }

        /////////////////////////////

        /**
        *   Calls API to get all categorys 
        *   @returns {Promise|categoryModel[]} - When promise is resolved returns an array of categorys
        */
        function getAll() {

           
            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_GET_CATEGORY_ROUTE,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                    return  response.data.categorys.map(function(category) {
                        return new categoryModel(category);
                    });
                }
            });
        }
    }

}());
