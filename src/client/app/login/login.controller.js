(function () {
  'use strict';

  angular
    .module('app.login')
    .controller('loginController', loginController);

  loginController.$inject = ['$state','$scope', '$q', 'logger', 'dataservice', 'appConfig'];
  /* @ngInject */
  function loginController($state, $scope, $q, logger, dataservice, appConfig) {
    var vm = this;


        var vm = this;

        // public methods
        vm.doLogin = doLogin;
     
        // properties
        vm.username = "";
        vm.password = "";
        vm.countries = [];
        vm.loggingIn = false;
        vm.loginError = false;


        activate();

        //////////////////////////////

        /**
        *   LoginController activator function, called every time controller is instantiated
        */
        function activate() {

        }

        //////////////////////////////

        /**
        *   Method for logging User to the system, by using authentication service
        *   All needed values are taken from the ViewModel
        */
        function doLogin() {

            // if username or password is not provided, ignore request for login
            if (!vm.username || !vm.password) {

                vm.loginError = true;

                return;
            }

            vm.loggingIn = true;
            vm.loginError = false;

            dataservice.userService.login(vm.username, vm.password, appConfig.GRANT_TYPE_LOGIN)
                .then(logUser, showError)
                .then(function() {

                    vm.loggingIn = false;
                });
        }

        function showError() {

            vm.loginError = true;
        }

        function logUser() {

            $state.go('dashboard');
        }
    }

})();
