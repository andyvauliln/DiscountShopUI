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
                url: appConfig.API_CATEGORY_ROUTE,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                    return  response.data.categories.map(function(category) {
                        return new categoryModel(category);
                    });
                }
            });
        }

        /**
        *   Calls API to get  categorys
        *   @returns {Promise|categoryModel} - When promise is resolved returns category
        */
        function getById(id) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_CATEGORY_ROUTE + id,
                params: {}
            })
            .then(function(response) {

                if (response.data) {

                  return new categoryModel(response.data);
                }
            });
        }
        /*
        *   Calls API to delete  category
        */
        function remove(id) {

            return API.http({
                method: appConfig.methods.DELETE,
                url: appConfig.API_CATEGORY_ROUTE + id,
                params: {}
            })
            .then(function(response) {

               logger.info('category deleted');
            });
        }

         function addOrUpdate(item) {

            return API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_CATEGORY_ROUTE,
                data: item
            })
            .then(function(response) {

               logger.info('category was added/updated successful');
               if (response.data) {

                  return new categoryModel(response.data);
                }
            });
        }
    }

}());
