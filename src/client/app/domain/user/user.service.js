(function () {

    angular
        .module('app.core')
        .service('userService', userService);

    userService.$inject = ['$http', 'ipCookie', '$q', 'userModel', 'API', 'appConfig', 'logger'];
    // 
    /**
    *   Service responsible for all actions on users (API calls, caching, events)
    *   @param {$http} $http - Angular's $http service
    *   @param {$q} $q - Angular's $q service
    *   @param {userModel} userModel - user domain model
    *   @param {API} API - cFactory API wrapper service
    *   @param {Object} 'config' - Application configuration
    */
    function userService($http, ipCookie, $q, userModel, API, appConfig, logger) {

        var service = this;

        // public methods
        service.getAll = getAll;
        service.getById = getById;
        service.remove = remove;
        service.addOrUpdate = addOrUpdate;
        service.attachShare = attachShare;
        service.deattachShare = deattachShare;
        service.getAuthToken = getAuthToken;
        service.isUserLoggedIn = isUserLoggedIn;
        service.setAuthToken = setAuthToken;
        service.login = login;

        activate();

        /////////////////////////////

        /**
        *   userService activator function, called only once, when the service is instantiated
        */
        function activate() {


        }
        
        /**
         * Check whether the user is authenticated.
         *
         * @param   {void}
         * @returns {bool} The user authentication status.
         */
        function isUserLoggedIn() {
            return getAuthToken() ? true : false;
        }
        
        /**
     * Authenticate the user against the API.
     *
     * @param   {string} username   The username to authenticate.
     * @param   {string} password   The password to verify.
     * @param   {string} grantType  The authentication method.
     * @param   {bool}   rememberMe The user's session caching preference.
     * @returns {object}            The deferred promise or reject response.
     */
        function login(username, password, grantType) {

            var params = appConfig.GRANT_TYPE_KEY + grantType +
                //appConfig.CLIENT_ID_KEY + appConfig.CLIENT_ID +
                //appConfig.CLIENT_SECRET_KEY + appConfig.CLIENT_SECRET +
                appConfig.USERNAME_KEY + username +
                appConfig.PASSWORD_KEY + password;

            return API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_AUTH_TOKEN_PATH,
                data: params
            })
                .then(function (response) {
                setAuthToken(response.data.token_type + ' ' + response.data.access_token);
            });
        }
        
            
        /**
         * Return the current user object.
         *
         * @param   {void}
         * @returns {object} The UserModel model.
         */
        function getAuthToken() {
            return ipCookie(appConfig.AUTH_COOKIE);
        }
    
        /**
         * Save the current user object.
         *
         * @param   {object} The UserModel model.
         * @returns {void}
         */
        function setAuthToken(token) {
           ipCookie(appConfig.AUTH_COOKIE, token);
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
                .then(function (response) {

                if (response.data) {

                    return response.data.users.map(function (user) {
                        return new userModel(user);
                    });
                }
            });
        }

        /**
       *   Calls API to get all users 
       *   @returns {Promise|userModel[]} - When promise is resolved returns an array of users
       */
        function getCities() {


            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_CITIES_ROUTE,
                params: {}
            })
                .then(function (response) {

                if (response.data) {

                    return response.data.cities;
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
                .then(function (response) {

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
                .then(function (response) {

                logger.info('user deleted');
            });
        }

        function addOrUpdate(item) {

            return API.http({
                method: appConfig.methods.POST,
                url: appConfig.API_USER_ROUTE,
                data: item
            })
                .then(function (response) {

                logger.info('user was added/updated successful');
                if (response.data) {

                    return new userModel(response.data);
                }
            });
        }

        ////////////////////////////////////////////////////////////////////
        function attachShare(orgId, shareId) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_USER_ROUTE + orgId + appConfig.API_ATTACH_SHARE_TO_USER_ROUTE + shareId,
                params: {}
            })
                .then(function (response) {

                if (response.data) {
                    logger.info('Item was add successful');
                    return new userModel(response.data);
                }
            });
        }
        function deattachShare(orgId, shareId) {

            return API.http({
                method: appConfig.methods.GET,
                url: appConfig.API_USER_ROUTE + orgId + appConfig.API_DEATTACH_SHARE_FROM_USER_ROUTE + shareId,
                params: {}
            })
                .then(function (response) {

                if (response.data) {
                    logger.info('Item was deattach successful');
                    return new userModel(response.data);
                }
            });


        }
    }

} ());
